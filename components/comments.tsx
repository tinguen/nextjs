import styled from 'styled-components'
import Comment from './comment'
import { Comment as CommentType } from '../types/post'
import CreateComment from './create-comment'

type Props = {
  comments: CommentType[]
  id: number
}

const StyledHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.25;
  margin-bottom: 1rem;
  margin-top: 2rem;
  @media (min-width: 768px) {
    font-size: 2.25rem;
    letter-spacing: -0.05em;
  }
`

const StyledCommentsContainer = styled.div`
  margin-bottom: 8rem;
`

const Comments = ({ comments, id }: Props) => {
  return (
    <section>
      <StyledCommentsContainer>
        <StyledHeader>Comments</StyledHeader>
        {comments.map((comment) => {
          return <Comment key={comment.id} body={comment.body} />
        })}
        <CreateComment id={id} />
      </StyledCommentsContainer>
    </section>
  )
}

export default Comments
