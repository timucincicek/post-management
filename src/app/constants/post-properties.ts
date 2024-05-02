import { Post } from "../enums/post";

export const arrayOfPostProperties = Object.keys(Post).filter((item) => isNaN(Number(item)));;
