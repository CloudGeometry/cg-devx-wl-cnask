import { styled } from '@mui/material/styles';
import { Link, LinkProps } from 'react-router-dom';

export const StyledRouterLink = styled(Link)(
  ({ theme }) => `
  text-decoration: none;
  color: ${theme.palette.primary.main};
  &:hover {
    text-decoration: underline;
    color:  ${theme.palette.primary.light};
  }
`
);
export function RouterLink({ children, ...rest }: LinkProps) {
  return <StyledRouterLink {...rest}>{children}</StyledRouterLink>;
}

export default RouterLink;
