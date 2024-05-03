import { ExtendedPost } from '../models/extended-post';
import { extendedPost, extendedPostList } from '../unit-test/post';
import { onPostClick, setExtendedPostList, setLoading, setPreviousPost, updateExtendedPost } from './actions';
import { extendedPostListReducer, previousPostReducer, activePostReducer, loadingReducer } from './reducers';

describe('Reducers', () => {
    describe('extendedPostListReducer', () => {
        it('should set the extended post list', () => {
            const initialState: ExtendedPost[] = [];
            const action = setExtendedPostList({ value: extendedPostList });
            const result = extendedPostListReducer(initialState, action);
            expect(result).toEqual(extendedPostList);
        });

        it('should update an extended post', () => {
            const initialState: ExtendedPost[] = [{ ...extendedPost, title: 'Test Post' }];
            const updatedPost: ExtendedPost = { ...extendedPost, title: 'Updated Post' };
            const action = updateExtendedPost({ value: updatedPost });
            const result = extendedPostListReducer(initialState, action);
            expect(result[0]).toEqual(updatedPost);
        });
    });

    describe('previousPostReducer', () => {
        it('should set the previous post', () => {
            const initialState: ExtendedPost = null;
            const newPreviousPost: ExtendedPost = { ...extendedPost, title: 'Previous Post' };
            const action = setPreviousPost({ value: newPreviousPost });
            const result = previousPostReducer(initialState, action);
            expect(result).toEqual(newPreviousPost);
        });
    });

    describe('activePostReducer', () => {
        it('should set the active post', () => {
            const initialState: ExtendedPost = null;
            const newActivePost: ExtendedPost = { ...extendedPost, title: 'Active Post' };
            const action = onPostClick({ value: newActivePost });
            const result = activePostReducer(initialState, action);
            expect(result).toEqual(newActivePost);
        });
    });

    describe('loadingReducer', () => {
        it('should set the loading state', () => {
            const initialState = false;
            const newLoadingState = true;
            const action = setLoading({ value: newLoadingState });
            const result = loadingReducer(initialState, action);
            expect(result).toEqual(newLoadingState);
        });
    });
});
