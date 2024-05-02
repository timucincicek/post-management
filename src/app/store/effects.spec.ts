import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';
import { fetchPosts, onPostClick, setExtendedPostList, setPreviousPost, updateExtendedPost, setLoading } from './actions';
import { Post } from '../enums/post';
import { Effects } from './effects';
import { postList } from '../unit-test/post-list';
import { post } from '../unit-test/post';

describe('Effects', () => {
    let effects: Effects;
    let actions$: Observable<any>;
    let store: MockStore<any>;
    let toastrService: ToastrService;
    let apiService: jasmine.SpyObj<ApiService>;

    beforeEach(() => {
        const actions = new Observable<any>();
        TestBed.configureTestingModule({
            providers: [
                Effects,
                provideMockActions(() => actions),
                provideMockStore(),
                {
                    provide: ToastrService, useValue: {
                        success: () => { },
                        error: () => { }
                    }
                },
                {
                    provide: ApiService, useValue: {
                        fetchPosts: () => of(postList)
                    }
                }
            ]
        });

        effects = TestBed.inject(Effects);
        actions$ = TestBed.inject(Actions);
        store = TestBed.inject(MockStore);
        toastrService = TestBed.inject(ToastrService);
        apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    });

    describe('setExtendedPostsEffect', () => {
        it('should dispatch setExtendedPostList and toastr.success on successful fetchPosts', () => {
            apiService.getPosts.and.returnValue(of(postList));
            const expectedActions = [
                setLoading({ value: true }),
                setExtendedPostList({ value: postList.map((item, index) => ({ ...item, activeState: Post.title, index })) }),
                setLoading({ value: false })
            ];

            actions$ = hot('-a-', { a: fetchPosts() });
            const expected$ = cold('-b-', { b: expectedActions });
            expect(effects.setExtendedPostsEffect).toBeObservable(expected$);
            expect(toastrService.success).toHaveBeenCalledWith('Posts are successfully fetched!');
        });

        it('should dispatch toastr.error on failed fetchPosts', () => {
            apiService.getPosts.and.returnValue(throwError('Error'));

            actions$ = hot('-a-', { a: fetchPosts() });
            const expected$ = cold('-b-', { b: [toastrService.error] });
            expect(effects.setExtendedPostsEffect).toBeObservable(expected$);
            expect(toastrService.error).toHaveBeenCalledWith('Failed to fetch posts. Please try again!');
        });
    });

    describe('onPostClickEffect', () => {
        it('should dispatch updateExtendedPost and setPreviousPost if current post is different from previous post', () => {
            const currentPost = { ...post };
            const previousPost = {
                body: 'dummy-body-2',
                activeState: Post.title,
                index: 1
            };
            store.setState({ previousPost });
            actions$ = hot('-a-', { a: onPostClick({ value: currentPost }) });
            const expected$ = cold('-b-', { b: [updateExtendedPost({ value: { ...currentPost, activeState: 1 } }), setPreviousPost({ value: currentPost })] });
            expect(effects.onPostClickEffect).toBeObservable(expected$);
        });
        it('should only dispatch updateExtendedPost if current post is the same as previous post', () => {
            const currentPost = { ...post };
            const previousPost ={ ...post };
            store.setState({ previousPost });
            actions$ = hot('-a-', { a: onPostClick({ value: currentPost }) });
            const expected$ = cold('-b-', { b: [updateExtendedPost({ value: { ...currentPost, activeState: 1 } })] });
            expect(effects.onPostClickEffect).toBeObservable(expected$);
        });
    });
});
