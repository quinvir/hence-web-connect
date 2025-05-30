import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  padding: 24px 0px 48px 0px;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  h1 {
    color: #000;
    font-family: "SUIT Variable";
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    letter-spacing: -0.25px;
  }
`;

export const InnerBox = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 24px;
`;

export const ContentBox = styled.div`
  flex: 1;
  padding: 24px;
  border-radius: 10px;
  border: 1px solid #e6e6e6;
`;
