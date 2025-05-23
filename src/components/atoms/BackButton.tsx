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
  width: 24px;
  height: 24px;
  background: url("/assets/images/icon/back-button.svg") no-repeat center;
  background-size: contain;
`;

const BackButton = () => {
  const navigate = useNavigate();

  return <Button onClick={() => navigate(-1)} />;
};

export default BackButton;
