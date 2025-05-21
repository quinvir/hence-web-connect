import styled from "styled-components";

interface ButtonProps {
  $backgroudnColor?: string;
  $textColor?: string;
  $borderColor?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  fontWeight?: number;
  lineHeight?: string;
  letterSpacing?: string;
  $borderRadius?: string;
}

const Button = styled.button<ButtonProps>`
  border-radius: ${({ $borderRadius }) => $borderRadius || "12px"};
  cursor: pointer;
  background-color: ${({ $backgroudnColor }) => $backgroudnColor || "#fff"};
  font-size: ${({ fontSize }) => fontSize || "16px"};
  font-weight: ${({ fontWeight }) => fontWeight || 700};
  line-height: ${({ lineHeight }) => lineHeight || "140%"};
  letter-spacing: ${({ letterSpacing }) => letterSpacing || "-0.25px"};
  color: ${({ $textColor }) => $textColor || "#000"};
  border: ${({ $borderColor }) => $borderColor || ""};
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "50px"};
  transition: filter 0.2s ease;

  &:disabled {
    cursor: not-allowed;
  }
`;

export default Button;
