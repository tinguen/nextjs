import styled from 'styled-components'

type Props = {
  body?: string
}
const StyledHeader = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  line-height: 1.375;
  font-weight: 100;
`

const Comment = ({ body }: Props) => {
  return (
    <div>
      <StyledHeader>{body}</StyledHeader>
    </div>
  )
}

export default Comment
