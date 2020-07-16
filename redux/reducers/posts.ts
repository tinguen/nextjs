import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import { Post, Comment } from '../../types/post'
import { getAllPosts, createPost, getPostById, createComment } from '../../lib/api'

export enum ReduxActionTypes {
  FETCH_POSTS = 'FETCH_POSTS',
  FETCH_POST = 'FETCH_POST',
  FETCH_CURRENT_POST = 'FETCH_CURRENT_POST',
  PUSH_COMMENT = 'PUSH_COMMENT'
}

export interface ReduxBaseAction {
  type: ReduxActionTypes
}

export interface FetchPostsAction extends ReduxBaseAction {
  posts: Post[]
}

export interface FetchPostAction extends ReduxBaseAction {
  post: Post
}

export interface FetchCurrentPostAction extends ReduxBaseAction {
  currentPost: Post
}

export interface PushCommentAction extends ReduxBaseAction {
  comment: Comment
}

export interface ReduxPostsState {
  posts: Post[]
  currentPost: Post | {}
}

export const initialState: ReduxPostsState = {
  posts: [],
  currentPost: {}
}

type PostsReducerActions =
  | FetchPostsAction
  | FetchPostAction
  | FetchCurrentPostAction
  | PushCommentAction

const reducer = (state = initialState, action: PostsReducerActions) => {
  switch (action.type) {
    case ReduxActionTypes.FETCH_POSTS:
      return {
        ...state,
        posts: (action as FetchPostsAction).posts
      }
    case ReduxActionTypes.FETCH_POST:
      return {
        ...state,
        posts: [(action as FetchPostAction).post, ...state.posts]
      }
    case ReduxActionTypes.FETCH_CURRENT_POST: {
      return {
        ...state,
        currentPost: (action as FetchCurrentPostAction).currentPost
      }
    }
    case ReduxActionTypes.PUSH_COMMENT: {
      return {
        ...state,
        currentPost: {
          ...state.currentPost,
          comments: [
            ...((state.currentPost as Post).comments as Comment[]),
            (action as PushCommentAction).comment
          ]
        }
      }
    }
    default:
      return state
  }
}

export function fetchPosts(): ThunkAction<void, typeof reducer, unknown, Action<string>> {
  return async (dispatch) => {
    return getAllPosts()
      .then((posts) => dispatch({ type: ReduxActionTypes.FETCH_POSTS, posts: posts.reverse() }))
      .catch((e) => console.log(e))
  }
}

export function createNewPost(
  title: string,
  body: string
): ThunkAction<void, typeof reducer, unknown, Action<string>> {
  return (dispatch) => {
    return createPost(title, body)
      .then((post) => dispatch({ type: ReduxActionTypes.FETCH_POST, post }))
      .catch((e) => console.log(e))
  }
}

export function fetchCurrentPost(
  id: number
): ThunkAction<void, typeof reducer, unknown, Action<string>> {
  return (dispatch) => {
    return getPostById(id)
      .then((currentPost) => dispatch({ type: ReduxActionTypes.FETCH_CURRENT_POST, currentPost }))
      .catch((e) => console.log(e))
  }
}

export function createNewComment(
  postId: number,
  body: string
): ThunkAction<void, typeof reducer, unknown, Action<string>> {
  return (dispatch) => {
    return createComment(postId, body)
      .then(({ data }) => {
        // const { currentPost } = getState().posts
        // const comments = [...currentPost.comments, data]
        return dispatch({ type: ReduxActionTypes.PUSH_COMMENT, comment: data })
      })
      .catch((e) => console.log(e))
  }
}

export default reducer
