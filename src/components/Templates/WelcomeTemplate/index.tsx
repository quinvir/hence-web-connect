import { useNavigate } from "react-router-dom";
import Button from "../../atoms/Button";
import { ButtonBox, FormCardWrapper, Header, ImageBox } from "./styles";

const WelcomeTemplate = () => {
  const nickname = localStorage.getItem("nickname");

  const navigate = useNavigate();

  const onWelcomeHandler = () => {
    navigate("/profile/edit");
  };

  return (
    <FormCardWrapper>
      <Header>
        <h1>
          <span>HENCE CONNECT</span>에 오신
        </h1>
        <h1>
          <span>{nickname}님</span>을 환영해요 🎉
        </h1>
      </Header>
      <ImageBox>
        <img src="/assets/images/img/welcome.png" alt="Welcome" />
      </ImageBox>
      <ButtonBox>
        <Button
          onClick={onWelcomeHandler}
          type="button"
          width="360px"
          $backgroudnColor="#2B77F5"
          $textColor="#fff"
          $borderRadius="10px"
        >
          시작하기
        </Button>
      </ButtonBox>
    </FormCardWrapper>
  );
};

export default WelcomeTemplate;
