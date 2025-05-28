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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

interface LayoutProps {
  $mode: "edit" | "view";
  $showDelete?: boolean;
}

export const HeaderRow = styled.div<LayoutProps>`
  display: grid;
  grid-template-columns: ${({ $mode }) =>
    $mode === "edit" ? "80px 1fr 1fr 50px" : "80px 1fr 1fr"};
  gap: 12px;
  margin-bottom: 8px;

  div {
    color: #000;
    font-family: "SUIT Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: -0.25px;
  }
`;

export const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const InputFieldBox = styled.div<LayoutProps>`
  display: grid;
  grid-template-columns: ${({ $mode, $showDelete }) =>
    $mode === "edit" && $showDelete ? "80px 1fr 1fr 50px" : "80px 1fr 1fr"};

  gap: 12px;
  align-items: center;

  input {
    width: 100%;
    height: 50px;
    padding: 10px;
    border-radius: 8px;
    border: none;
    background-color: #fafafa;

    color: #000;
    font-family: "SUIT Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: -0.25px;
  }

  input::placeholder {
    color: #999;
    font-family: "SUIT Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: -0.25px;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: red;
  }
`;

export const ImageBox = styled.label<{ $isThumbnail?: boolean }>`
  display: flex;
  width: 80px;
  height: 80px;
  padding: ${({ $isThumbnail }) => ($isThumbnail ? "0px" : "0px 16px;")};
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: #fafafa;
  cursor: pointer;

  img {
    width: ${({ $isThumbnail }) => ($isThumbnail ? "80px" : "32px")};
    height: ${({ $isThumbnail }) => ($isThumbnail ? "80px" : "32px")};
    object-fit: cover;
    border-radius: 12px;
    cursor: pointer;
  }
`;

export const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RemoveButtonBox = styled.div`
  width: 50px;
  height: 50px;
  background-color: #ff00001a;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 32px;
    height: 32px;
  }
`;
