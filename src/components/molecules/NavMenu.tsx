import styled from "styled-components";
import NavItem from "../atoms/NavItem";

const Nav = styled.div`
  display: flex;
  height: 64px;
  align-items: center;
  gap: 24px;
  flex: 1 0 0;
`;

const NavMenu = () => {
  return (
    <Nav>
      <NavItem to="/home" label="홈" />
      <NavItem to="/profile/edit" label="내 프로필" />
      <NavItem to="/points" label="포인트" />
      <NavItem to="/settings" label="설정" />
    </Nav>
  );
};

export default NavMenu;
