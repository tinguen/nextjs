import axios from 'axios'
import { Post } from '../types/post'

const API_URL = 'https://simple-blog-api.crew.red'

export function getPostById(id: number) {
  return axios
    .get(`${API_URL}/posts/${id}?_embed=comments`)
    .then(({ data }) => {
      const post = { ...data }
      if (typeof post.body !== 'string') {
        post.body = JSON.stringify(post.body)
      }
      if (typeof post.title !== 'string') {
        post.title = JSON.stringify(post.title)
      }
      return post
    })
    .catch(() => ({}))
}

export function getAllPosts() {
  return axios
    .get(`${API_URL}/posts`)
    .then(({ data }) => {
      const posts = data.map((post: Post) => {
        const checkedPost = { ...post }
        if (post.body && typeof post.body !== 'string') {
          checkedPost.body = JSON.stringify(post.body)
        }
        if (post.title && typeof post.title !== 'string') {
          checkedPost.title = JSON.stringify(post.title)
        }
        return checkedPost
      })
      return posts
    })
    .catch(() => [])
}

export function createPost(title: string, body: string) {
  return axios.post(`${API_URL}/posts`, { title, body })
}

export function createComment(postId: number, body: string) {
  return axios.post(`${API_URL}/comments`, { postId, body })
}
