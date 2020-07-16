import styled from 'styled-components'

type Props = {
  content: string | undefined
}

const StyledPostBody = styled.div`
  max-width: 42rem;
  margin-right: auto;
  margin-left: auto;
  div {
    font-size: 1.125rem;
    line-height: 1.625;
  }
`

const PostBody = ({ content = '' }: Props) => {
  return (
    <StyledPostBody>
      <div>{content}</div>
    </StyledPostBody>
  )
}

export default PostBody
