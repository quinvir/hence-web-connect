import Header from "../../organisms/Header";
import { Main } from "./styles";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header variant="auth" />
      <Main>{children}</Main>
    </>
  );
};

export default AuthLayout;
