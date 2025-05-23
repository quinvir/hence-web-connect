import styled from "styled-components";

interface MainProps {
  $variant?: "default" | "white";
}

export const Main = styled.section<MainProps>`
  background-color: ${({ $variant }) =>
    $variant === "white" ? "#ffffff" : "#f5f5f5"};
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;

  ${({ $variant }) =>
    $variant !== "white" &&
    `
      align-items: center;
    `}
`;
