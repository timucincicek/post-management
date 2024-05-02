import { createReducer, on } from "@ngrx/store";
import { ExtendedPost } from "../models/extended-post";
import { onPostClick, setExtendedPostList, setLoading, setPreviousPost, updateExtendedPost } from "./actions";

const extendedPostListState: ExtendedPost[] = [];
const previousPostState: ExtendedPost = null;
const activePostState: ExtendedPost = null;
const loadingState = false;

export const extendedPostListReducer = createReducer(
    extendedPostListState,
    on(setExtendedPostList, (_, action) => action.value),
    on(updateExtendedPost, (state, action) => {
        const clonedState = [...state];
        clonedState[action.value.index] = action.value;
        return clonedState;
    })
)

export const previousPostReducer = createReducer(
    previousPostState,
    on(setPreviousPost, (_, action) => action.value),
)

export const activePostReducer = createReducer(
    activePostState,
    on(onPostClick, (_, action) => action.value),
)

export const loadingReducer = createReducer(
    loadingState,
    on(setLoading, (_, action) => action.value)
)
