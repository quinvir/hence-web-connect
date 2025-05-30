import styled from "styled-components";

export const Wrapper = styled.div`
  font-family: SUIT Variable;
  line-height: 160%;
  letter-spacing: -0.25px;
  vertical-align: middle;
  border-radius: 10px;
`;

export const Title = styled.div`
  font-family: SUIT Variable;
  font-size: 16px;
  font-weight: 700;
  height: 50px;
  display: flex;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  white-space: pre-line;
  max-height: 500px;
  overflow-y: auto;

  p {
    font-family: SUIT Variable;
    font-weight: 400;
    font-size: 14px;
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;
