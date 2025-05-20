import NavItem from "../atoms/NavItem";

const NavMenu = () => {
  return (
    <nav className="flex gap-6">
      <NavItem to="/home" label="홈" />
      <NavItem to="/profile" label="내 프로필" />
      <NavItem to="/points" label="포인트" />
      <NavItem to="/settings" label="설정" />
    </nav>
  );
};

export default NavMenu;
