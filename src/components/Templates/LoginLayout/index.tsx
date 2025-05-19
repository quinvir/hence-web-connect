import LoginFormSection from "../../organisms/LoginFormSection";
import LoginVisualSection from "../../organisms/LoginVisualSection";
import { Left, Right, Wrapper } from "./styles";

export default function LoginLayout() {
  return (
    <Wrapper>
      <Left>
        <LoginVisualSection />
      </Left>
      <Right>
        <LoginFormSection />
      </Right>
    </Wrapper>
  );
}
