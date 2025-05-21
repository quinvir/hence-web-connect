import styled from "styled-components";
import NavItem from "../atoms/NavItem";

const Nav = styled.div`
  display: flex;
  max-width: 640px;
  height: 64px;
  align-items: center;
  gap: 24px;

  flex-wrap: wrap;
  justify-content: start;
  flex: 1;
`;

const NavMenu = () => {
  return (
    <Nav>
      <NavItem to="/" label="홈" />
      <NavItem to="/profile/edit" label="내 프로필" />
      <NavItem to="/points" label="포인트" />
      <NavItem to="/settings" label="설정" />
    </Nav>
  );
};

export default NavMenu;
