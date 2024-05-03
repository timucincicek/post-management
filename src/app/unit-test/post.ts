import { Post } from "../enums/post";

export const post = {
    userId: 12,
    id: 1,
    title: 'dummy-title',
    body: 'dummy-body',
}

export const extendedPost = {
    ...post,
    activeState: Post.title,
    index: 0
};

export const postList = [post];

export const extendedPostList = [extendedPost];