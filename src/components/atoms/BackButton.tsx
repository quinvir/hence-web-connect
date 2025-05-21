import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 10;
`;

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(-1)}>
      <img
        src="/assets/images/icon/back-button.svg"
        alt="Back button"
        style={{ width: "24px", height: "24px" }}
      />
    </Button>
  );
};

export default BackButton;
