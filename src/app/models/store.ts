import { ExtendedPost } from "./extended-post";

export interface StoreDTO {
    extendedPostList: ExtendedPost[];
    previousPost: ExtendedPost;
    activePost:ExtendedPost;
    loading:boolean;
}