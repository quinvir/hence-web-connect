import styled from "styled-components";
import Button from "../atoms/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  button {
    min-width: 320px;
  }
`;

const SocialLoginButtonGroup = () => {
  return (
    <Wrapper>
      <Button $backgroudnColor="#FFE333" $textColor="#000">
        카카오 계정으로 연결하기
      </Button>
      <Button $backgroudnColor="#00BB57" $textColor="#FFF">
        네이버 계정으로 연결하기
      </Button>
      <Button
        $backgroudnColor="#fff"
        $textColor="#000"
        $borderColor="1px solid #D9D9D9;"
      >
        구글 계정으로 연결하기
      </Button>
    </Wrapper>
  );
};

export default SocialLoginButtonGroup;
