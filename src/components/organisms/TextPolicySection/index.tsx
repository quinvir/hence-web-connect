import { Wrapper, Title, Content } from "./styles";

interface Props {
  title: string;
  text: string;
}

const TextPolicySection = ({ title, text }: Props) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Content>
        <p>{text}</p>
      </Content>
    </Wrapper>
  );
};

export default TextPolicySection;
