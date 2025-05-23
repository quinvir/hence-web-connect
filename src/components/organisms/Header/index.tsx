import Logo from "../../atoms/Logo";
import NavMenu from "../../molecules/NavMenu";
import UserMenu from "../../molecules/UserMenu";
import { HeaderWrapper } from "./styles";

interface HeaderProps {
  variant?: "auth" | "main";
}

const Header = ({ variant = "main" }: HeaderProps) => {
  if (variant === "auth") {
    return (
      <HeaderWrapper>
        <Logo />
      </HeaderWrapper>
    );
  }

  return (
    <HeaderWrapper>
      <Logo />
      <NavMenu />
      <UserMenu />
    </HeaderWrapper>
  );
};

export default Header;
