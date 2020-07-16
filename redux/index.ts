import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import postsReducer, { initialState, ReduxPostsState } from './reducers/posts'

let store: any

function initStore(preloadedState = initialState) {
  return createStore(postsReducer, preloadedState, composeWithDevTools(applyMiddleware(thunk)))
}

export const initializeStore = (preloadedState?: ReduxPostsState) => {
  let _store = store ?? initStore(preloadedState)

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState
    })
    store = undefined
  }

  if (typeof window === 'undefined') return _store
  if (!store) store = _store

  return _store
}

export function useStore(storeState: ReduxPostsState) {
  const s = useMemo(() => initializeStore(storeState), [storeState])
  return s
}
