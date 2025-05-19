import styled from "styled-components";

export const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 80px;
  gap: 48px;
  align-self: stretch;
`;

export const TextBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  font-family: "SUIT Variable";
  line-height: 140%;
  letter-spacing: -0.25px;
  gap: 12px;

  h1 {
    color: #000;
    font-size: 36px;
    font-weight: 700;
  }

  p {
    color: #303030;
    font-size: 16px;
    font-weight: 400;
  }

  span {
    font-family: "Titan One";
    color: #000;
    font-size: 16px;
    font-weight: 400;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  width: 320px;
  gap: 10px;
  padding: 10px;
`;

export const Line = styled.div`
  flex: 1;
  max-width: 128px;
  height: 1px;
  background-color: #d9d9d9;
`;

export const Text = styled.span`
  color: #999;
  font-family: "SUIT Variable";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.25px;
`;
