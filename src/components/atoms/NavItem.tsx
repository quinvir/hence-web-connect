import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledNavItem = styled(Link)<{ $active: boolean }>`
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  color: ${({ $active }) => ($active ? "#000" : "#646464")};
  text-decoration: none;
  font-family: "SUIT Variable";
  font-size: 16px;
  font-style: normal;
  line-height: 140%;
  letter-spacing: -0.25px;

  &:hover {
    color: #000;
  }
`;

interface NavItemProps {
  to: string;
  label: string;
}

const NavItem = ({ to, label }: NavItemProps) => {
  const location = useLocation();
  const isActive =
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <StyledNavItem to={to} $active={isActive}>
      {label}
    </StyledNavItem>
  );
};

export default NavItem;
