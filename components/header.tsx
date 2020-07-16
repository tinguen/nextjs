import Link from 'next/link'
import styled from 'styled-components'

const StyledHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.25;
  margin-bottom: 5rem;
  margin-top: 2rem;
  @media (min-width: 768px) {
    font-size: 2.25rem;
    letter-spacing: -0.05em;
  }
`

const StyledLink = styled.a`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

const Header = () => {
  return (
    <StyledHeader>
      <Link href="/">
        <StyledLink>Blog</StyledLink>
      </Link>
      .
    </StyledHeader>
  )
}

export default Header
