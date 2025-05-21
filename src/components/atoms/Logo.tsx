import styled from "styled-components";

const LogoBox = styled.div`
  h1 {
    color: #000;
    font-family: "Titan One";
    font-size: 20px;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: -0.25px;
  }
`;

const Logo = () => {
  return (
    <LogoBox>
      <h1>HENCE</h1>
    </LogoBox>
  );
};

export default Logo;
