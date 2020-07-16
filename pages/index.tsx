import Head from 'next/head'
import { useSelector } from 'react-redux'
import Container from '../components/container'
import Posts from '../components/posts'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { Post } from '../types/post'
import { fetchPosts } from '../redux/reducers/posts'
import { initializeStore } from '../redux'

interface RootState {
  posts: Post[]
}

const Index = () => {
  const posts = useSelector((s: RootState) => s.posts)
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog</title>
        </Head>
        <Container>
          <Intro />
          <Posts posts={posts} />
        </Container>
      </Layout>
    </>
  )
}

export async function getServerSideProps() {
  const reduxStore = initializeStore()
  const { dispatch } = reduxStore
  await dispatch(fetchPosts())
  return { props: { initialReduxState: reduxStore.getState() } }
}

export default Index
