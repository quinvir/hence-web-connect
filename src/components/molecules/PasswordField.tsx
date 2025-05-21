import { useState } from "react";
import styled from "styled-components";
import Input from "../atoms/Input";
import { Control, Controller, RegisterOptions, useForm } from "react-hook-form";

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 320px;
`;

const Label = styled.label<{ $error?: boolean }>`
  font-size: 14px;
  color: ${({ $error }) => ($error ? "#E60000" : "#222")};
`;

const InputWithIconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled(Input)<{ $error?: boolean }>`
  flex: 1;
  height: 50px;
  box-sizing: border-box;
  background-color: ${({ $signup }) => $signup && "#FAFAFA"};
  bborder: 1px solid
    ${({ $error, $signup }) =>
      $error ? "#e60000" : $signup ? "#FAFAFA" : "#d9d9d9"};
  color: #000;

  &:focus {
    border-color: ${({ $error }) => ($error ? "#E60000" : "#2b77f5")};
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;

  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;

  ${InputWithIconWrapper}:focus-within & {
    opacity: 1;
    pointer-events: auto;
  }
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
  placeholder: string;
  name: string;
  signup?: boolean;
  errorMessage?: string;
  control: Control<any>;
  rules?: RegisterOptions;
}

const PasswordField = ({
  label,
  placeholder,
  name,
  errorMessage,
  control,
  rules,
  signup,
}: Props) => {
  const [visible, setVisible] = useState(false);
  const hasError = !!errorMessage;

  const eyeIcon = "/assets/images/icon/eye.svg";
  const eyeOffIcon = "/assets/images/icon/eye-off.svg";

  return (
    <FieldWrapper>
      <Label htmlFor={name} $error={hasError}>
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={rules}
        render={({ field: { onChange, ...rest } }) => (
          <InputWithIconWrapper>
            <StyledInput
              {...rest}
              type={visible ? "text" : "password"}
              id={name}
              placeholder={placeholder}
              $error={hasError}
              minLength={8}
              maxLength={20}
              $signup={signup}
              onChange={(e) => {
                if (!/\s/.test(e.target.value)) {
                  onChange(e.target.value);
                }
              }}
            />
            <ToggleButton onClick={() => setVisible((v) => !v)} type="button">
              <img
                src={visible ? eyeIcon : eyeOffIcon}
                alt={visible ? "Invisible password" : "Visible password"}
                width={24}
                height={24}
              />
            </ToggleButton>
          </InputWithIconWrapper>
        )}
      />
      {hasError && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </FieldWrapper>
  );
};

export default PasswordField;
