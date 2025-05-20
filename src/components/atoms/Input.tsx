import styled from "styled-components";

const Input = styled.input`
  font-family: "SUIT Variable";
  width: 100%;
  height: 50px;
  padding: 0px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 12px;

  &::placeholder {
    color: #999;
    font-size: 16px;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: -0.25px;
  }

  &:focus {
    border-color: #2b77f5;
    outline: none;
  }
`;

export default Input;
