import Link from 'next/link'
import styled from 'styled-components'

type Props = {
  title: string
  id: number
}

const StyledLink = styled.a`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
const StyledHeader = styled.h3`
  font-size: 1.875rem;
  margin-bottom: 0.75rem;
  line-height: 1.375;
`

const PostPreview = ({ title, id }: Props) => {
  return (
    <div>
      <StyledHeader>
        <Link as={`/posts/${id}`} href="/posts/[id]">
          <StyledLink>{title}</StyledLink>
        </Link>
      </StyledHeader>
    </div>
  )
}

export default PostPreview
