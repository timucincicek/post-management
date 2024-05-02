import { createAction, props } from "@ngrx/store";
import { ExtendedPost } from "../models/extended-post";

export const fetchPosts = createAction(
    '[PostList] FetchPosts'
)

export const setExtendedPostList = createAction(
    '[PostList] SetExtendedPostList',
    props<{ value: ExtendedPost[] }>()
)

export const updateExtendedPost = createAction(
    '[PostList] UpdateExtendedPost',
    props<{ value: ExtendedPost }>()
)

export const onPostClick = createAction(
    '[PostList] OnPostClick',
    props<{ value: ExtendedPost }>()
)

export const setPreviousPost = createAction(
    '[PostList] SetPreviousPost',
    props<{ value: ExtendedPost }>()
)

export const setLoading = createAction(
    '[Loading] SetLoading',
    props<{ value: boolean }>()
)

