import { Post } from "./post";

export interface ExtendedPost extends Post {
    activeState: number;
    index:number;
}