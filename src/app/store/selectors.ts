import { StoreDTO } from "../models/store";

export const selectExtendedPostList = (store: StoreDTO) => store.extendedPostList;
export const selectActivePost = (store: StoreDTO) => store.activePost;
export const selectPreviousPost = (store: StoreDTO) => store.previousPost;
export const selectLoading = (store: StoreDTO) => store.loading;
