import styled from "styled-components";

const Box = styled.div`
  position: relative;
  padding: 24px;
  border-radius: 10px;
  background-color: #fff;
  z-index: 0;
`;

const SvgBorder = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
`;

const DashedBorderBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box>
      <SvgBorder>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          rx="10"
          ry="10"
          fill="none"
          stroke="#d9d9d9"
          strokeWidth="1"
          strokeDasharray="6 10"
        />
      </SvgBorder>
      {children}
    </Box>
  );
};

export default DashedBorderBox;
