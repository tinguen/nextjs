export interface Comment {
  body?: string
  postId: number
  id: number
}

export interface Post {
  id: number
  body: string
  title: string
  comments?: Comment[]
}
