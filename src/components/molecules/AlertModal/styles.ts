import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  display: flex;
  width: 360px;
  padding: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  background-color: #fff;
  border-radius: 10px;
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const Title = styled.h2`
  color: #000;
  font-family: "SUIT Variable";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: -0.25px;
`;

export const Message = styled.div`
  color: #000;
  font-family: "SUIT Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.25px;
`;

export const ButtonGroup = styled.div<{
  $type: "confirmOnly" | "cancelConfirm" | "warning";
}>`
  display: flex;
  gap: 12px;
  justify-content: ${({ $type }) =>
    $type === "confirmOnly" ? "flex-start" : "space-between"};
  width: 100%;
`;

export const Button = styled.button<{
  $variant: "confirm" | "cancel" | "warning";
  $only?: boolean;
}>`
  ${({ $only }) =>
    $only
      ? `
        width: 100%;
      `
      : `
        flex: 1;
      `}

  border-radius: 10px;
  border: none;
  cursor: pointer;
  min-height: 40px;

  font-family: "SUIT Variable";
  font-size: 16px;
  font-style: normal;
  line-height: 140%;
  letter-spacing: -0.25px;

  ${({ $variant }) => {
    switch ($variant) {
      case "confirm":
        return `
            background-color: #2b77f5;
            color: #fff;
            font-weight: 700;
          `;
      case "warning":
        return `
            background-color: #e60000;
            color: #fff;
            font-weight: 700;
          `;
      case "cancel":
      default:
        return `
            background-color: #e6e6e6;
            color: #000;
            font-weight: 400;
          `;
    }
  }}
`;
