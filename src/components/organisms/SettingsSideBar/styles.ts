import styled from "styled-components";

export const Wrapper = styled.div`
  font-family: SUIT Variable;
  width: 200px;
  height: 348px;
  padding: 20px;
  font-size: 16px;
  line-height: 160%;
  letter-spacing: -0.25px;
  vertical-align: middle;
  border-radius: 10px;
  padding: 24px;
  border: 1px solid #e6e6e6;
`;

export const Title = styled.div`
  font-family: SUIT Variable;
  font-weight: 700;
  height: 50px;
  display: flex;
  align-items: center;
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  padding: 0px 16px;
`;

export const MenuItem = styled.li<{
  $active: boolean;
  $disabled?: boolean;
}>`
  height: 50px;
  display: flex;
  align-items: center;
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
  color: #000;
  font-weight: ${({ $active }) => ($active ? "700" : "400")};
`;
