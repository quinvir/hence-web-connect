import { useState } from "react";
import styled from "styled-components";
import { Control, Controller, RegisterOptions } from "react-hook-form";

const FieldWrapper = styled.div<{ $gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap || "12px"};
  min-width: 320px;
`;

const Label = styled.label<{ $error?: boolean }>`
  font-size: 14px;
  font-weight: 400;
  color: ${({ $error }) => ($error ? "#e60000" : "#222")};
`;

const Textarea = styled.textarea<{ $error?: boolean }>`
  width: 100%;
  height: 120px;
  padding: 16px;
  color: #000;
  font-family: "SUIT Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.25px;
  border-radius: 12px;
  border: 1px solid ${({ $error }) => ($error ? "#e60000" : "#FAFAFA")};
  background-color: #fafafa;
  resize: none;

  &:focus {
    outline: none;
    border: 1px solid #2b77f5;
  }

  &::placeholder {
    color: #999;
    font-family: "SUIT Variable";
    font-size: 16px;
    font-weight: 400;
    line-height: 140%;
    letter-spacing: -0.25px;
  }
`;

const ErrorMessage = styled.p`
  color: #e60000;
  font-size: 12px;
  margin-top: -4px;
`;

interface Props {
  label: string;
  name: string;
  placeholder?: string;
  control: Control<any>;
  rules?: RegisterOptions;
  errorMessage?: string;
  gap?: string;
}

const TextareaField = ({
  label,
  name,
  placeholder,
  control,
  rules,
  errorMessage,
  gap,
}: Props) => {
  const hasError = !!errorMessage;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <FieldWrapper $gap={gap}>
      <Label htmlFor={name} $error={hasError}>
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        rules={{
          maxLength: {
            value: 500,
            message: "최대 200자까지 입력할 수 있어요.",
          },
          ...rules,
        }}
        render={({ field }) => (
          <Textarea
            id={name}
            {...field}
            placeholder={isFocused ? "" : placeholder}
            $error={hasError}
            maxLength={200}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              field.onBlur();
            }}
          />
        )}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </FieldWrapper>
  );
};

export default TextareaField;
