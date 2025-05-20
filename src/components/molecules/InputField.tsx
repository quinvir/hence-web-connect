import styled from "styled-components";
import Input from "../atoms/Input";

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 320px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #222;
`;

interface Props {
  label: string;
  type: string;
  placeholder: string;
  name: string;
}

const InputField = ({ label, type, placeholder, name }: Props) => {
  return (
    <FieldWrapper>
      <Label htmlFor={name}>{label}</Label>
      <Input type={type} id={name} name={name} placeholder={placeholder} />
    </FieldWrapper>
  );
};

export default InputField;
