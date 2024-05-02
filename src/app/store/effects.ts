import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ToastrService } from "ngx-toastr";
import { catchError, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { arrayOfPostProperties } from "../constants/post-properties";
import { Post } from "../enums/post";
import { StoreDTO } from "../models/store";
import { ApiService } from "../services/api.service";
import { onPostClick, setExtendedPostList, fetchPosts, setPreviousPost, updateExtendedPost, setLoading } from "./actions";
import { selectPreviousPost } from "./selectors";

@Injectable()
export class Effects {

    setExtendedPostsEffect = createEffect(() => this.actions$.pipe(
        ofType(fetchPosts),
        tap(() => {
            this.store.dispatch(setLoading({ value: true }))
        }),
        switchMap(() => this.apiService.getPosts().pipe(
            map((posts) => {
                const extendedPostItems = posts.map((item, index) => {
                    return { ...item, activeState: Post.title, index };
                });
                this.toastr.success('Posts are successfully fetched!');
                return setExtendedPostList({ value: extendedPostItems });
            }),
            catchError(() => {
                this.toastr.error('Failed to fetch posts. Please try again!');
                return of(null);
            }),
            tap(() => {
                this.store.dispatch(setLoading({ value: false }))
            })
        )),
    ))

    onPostClickEffect = createEffect(() => this.actions$.pipe(
        ofType(onPostClick),
        withLatestFrom(this.store.select(selectPreviousPost)),
        tap(([currentPostAction, previousPost]) => {
            this.store.dispatch(updateExtendedPost({
                value: {
                    ...currentPostAction.value,
                    activeState: (currentPostAction.value.activeState + 1) % arrayOfPostProperties.length
                }
            }));
            if (currentPostAction.value.id !== previousPost?.id) {
                this.store.dispatch(updateExtendedPost({
                    value: {
                        ...previousPost,
                        activeState: Post.title
                    }
                }));
                this.store.dispatch(setPreviousPost(currentPostAction));
            }
        })
    ), { dispatch: false })

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store<StoreDTO>,
        private readonly apiService: ApiService,
        private readonly toastr: ToastrService) { }

}