import styled from "styled-components";

const Input = styled.input<{ $signup?: boolean; $error?: boolean }>`
  font-family: "SUIT Variable";
  width: 100%;
  height: 50px;
  padding: 0px 16px;
  border: 1px solid
    ${({ $error, $signup }) =>
      $error ? "#e60000" : $signup ? "#FAFAFA" : "#d9d9d9"};
  border-radius: 12px;
  color: #000;
  font-size: 16px;
  font-weight: 400;
  background-color: ${({ $signup }) => $signup && "#FAFAFA"};

  &:focus {
    border-color: ${({ $error }) => ($error ? "#E60000" : "#2b77f5")};
  }

  &::placeholder {
    color: #999;
    font-size: 16px;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: -0.25px;
  }
`;

export default Input;
