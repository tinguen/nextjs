import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import { Post as PostType, Comment as CommentType } from '../../types/post'
import { initializeStore } from '../../redux'
import { fetchCurrentPost } from '../../redux/reducers/posts'
import Comments from '../../components/comments'

type Props = {
  post: PostType
}

const StyledArticle = styled.article`
  margin-bottom: 8rem;
`

interface RootState {
  currentPost: PostType
}

const Post = () => {
  const router = useRouter()
  const post = useSelector((s: RootState) => s.currentPost)
  if (!router.isFallback && !post?.id) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <StyledArticle>
              <Head>
                <title>{post.title} | Next.js Blog</title>
              </Head>
              <PostTitle>{post.title}</PostTitle>
              <PostBody content={post.body} />
            </StyledArticle>
            <Comments comments={post.comments as CommentType[]} id={post.id} />
          </>
        )}
      </Container>
    </Layout>
  )
}

export default Post

type Params = {
  params: {
    id: number
  }
}

export async function getServerSideProps({ params }: Params) {
  const reduxStore = initializeStore()
  const { dispatch } = reduxStore

  await dispatch(fetchCurrentPost(params.id))
  return {
    props: {
      initialReduxState: reduxStore.getState()
    }
  }
}
