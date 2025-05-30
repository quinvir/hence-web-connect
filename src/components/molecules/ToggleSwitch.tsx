import styled from "styled-components";

const Switch = styled.input`
  width: 40px;
  height: 24px;
  appearance: none;
  background: #e6e6e6;
  border-radius: 9999px;
  position: relative;
  outline: none;
  cursor: pointer;
  transition: background 0.3s;

  &:checked {
    background: #2b77f5;
  }

  &::before {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 18px;
    height: 18px;
    background: #f5f5f5;
    border-radius: 50%;
    transition: 0.3s;
  }

  &:checked::before {
    left: 19px;
  }
`;

interface Props {
  checked: boolean;
  onChange: () => void;
}

const ToggleSwitch = ({ checked, onChange }: Props) => {
  return <Switch type="checkbox" checked={checked} onChange={onChange} />;
};

export default ToggleSwitch;
