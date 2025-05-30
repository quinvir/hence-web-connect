import styled from "styled-components";

export const Wrapper = styled.div`
  font-family: SUIT Variable;
  font-size: 16px;
  line-height: 160%;
  letter-spacing: -0.25px;
  vertical-align: middle;
`;

export const Title = styled.h2`
  height: 50px;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const MenuItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0px 16px;
`;

export const Label = styled.span`
  font-size: 16px;
  color: #000000;
`;

export const ClickableText = styled.button`
  background: none;
  border: none;
  color: #000;
  font-size: 16px;
  cursor: pointer;
`;

export const WithdrawButton = styled(ClickableText)`
  color: #ff0000;
`;
