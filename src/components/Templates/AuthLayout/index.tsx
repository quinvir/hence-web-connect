import Header from "../../organisms/Header";
import { Main } from "./styles";

const AuthLayout = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: "default" | "white";
}) => {
  return (
    <>
      <Header variant="auth" />
      <Main $variant={variant}>{children}</Main>
    </>
  );
};

export default AuthLayout;
