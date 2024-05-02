import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { fetchPosts } from 'src/app/store/actions';
import { postList } from 'src/app/unit-test/post-list';
import { PostListComponent } from './post-list.component';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let store: Store;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()]
    }).compileComponents().then(() => {
      store = TestBed.inject(Store);
      fixture = TestBed.createComponent(PostListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call store.dispatch with fetchPosts action', () => {
      spyOn(store, 'dispatch');
      component.ngOnInit();
      expect(store.dispatch).toHaveBeenCalledWith(fetchPosts());
    })
  });

  describe('HTML Template', () => {
    let compiled: HTMLElement;
    let postComponents: NodeListOf<Element>;

    beforeEach(() => {
      compiled = fixture.nativeElement;
      postComponents = compiled.querySelectorAll('app-post');
    });

    it('should render the correct number of post components', () => {
      component.getExtendedPosts$ = of(postList);
      component.ngOnInit();
      fixture.detectChanges();
      const compiled: any = fixture.nativeElement;
      const postComponents = compiled.querySelectorAll('app-post');
      expect(postComponents.length).toEqual(postList.length);
    });

  })

});
