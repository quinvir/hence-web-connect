import styled from "styled-components";
import Input from "../atoms/Input";
import { Control, Controller, RegisterOptions } from "react-hook-form";

const FieldWrapper = styled.div<{ $gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap || "12px"};
  min-width: 320px;
`;

const Label = styled.label<{ $error?: boolean }>`
  font-size: 14px;
  color: ${({ $error }) => ($error ? "#e60000" : "#222")};
`;

const ErrorMessage = styled.p`
  align-self: stretch;
  color: #e60000;
  font-family: "SUIT Variable";
  font-size: 12px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.25px;
`;

interface Props {
  label: string;
  type: string;
  placeholder: string;
  name: string;
  signup?: boolean;
  gap?: string;
  errorMessage?: string;
  control: Control<any>;
  rules?: RegisterOptions;
}

const InputField = ({
  label,
  type,
  placeholder,
  name,
  signup,
  gap,
  errorMessage,
  control,
  rules,
}: Props) => {
  const hasError = !!errorMessage;

  return (
    <FieldWrapper $gap={gap}>
      <Label htmlFor={name} $error={hasError}>
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={rules}
        render={({ field }) => (
          <Input
            {...field}
            type={type}
            id={name}
            placeholder={placeholder}
            $signup={signup}
            $error={hasError}
          />
        )}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </FieldWrapper>
  );
};
export default InputField;
