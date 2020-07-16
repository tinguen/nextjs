import Layout from '../../components/layout'
import Title from '../../components/post-title'
import Container from '../../components/container'
import Header from '../../components/header'
import CreatePost from '../../components/create-post'

const NewPost = () => {
  return (
    <Layout>
      <Container>
        <Header />
        <Title>Create a new blog post</Title>
        <CreatePost />
      </Container>
    </Layout>
  )
}

export default NewPost
