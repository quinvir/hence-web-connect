import styled from "styled-components";
import Input from "../atoms/Input";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import { useState } from "react";

const FieldWrapper = styled.div<{ $gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap || "12px"};
  min-width: 320px;
`;

const Label = styled.label<{ $error?: boolean }>`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: ${({ $error }) => ($error ? "#e60000" : "#222")};

  span {
    color: red;
    margin-left: 2px;
    font-size: 14px;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    position: relative;
    top: 1px;
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
  label: React.ReactNode;
  type: string;
  placeholder: string;
  name: string;
  signup?: boolean;
  gap?: string;
  errorMessage?: string;
  control: Control<any>;
  rules?: RegisterOptions;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
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
  const [isFocused, setIsFocused] = useState(false);

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
        render={({ field: { value, onChange, onBlur, ...rest } }) => (
          <Input
            {...rest}
            type={type}
            id={name}
            value={value}
            placeholder={isFocused ? "" : placeholder}
            $signup={signup}
            $error={hasError}
            inputMode={name === "email" ? "email" : undefined}
            maxLength={name === "nickname" ? 20 : undefined}
            onChange={(e) => {
              let value = e.target.value;
              let processedValue = value;

              if (name === "nickname" || name === "email") {
                processedValue = value.replace(/\s/g, ""); // 전체 공백 제거
              } else if (name === "phone") {
                const numbersOnly = value.replace(/[^0-9]/g, "");

                // 서울 (02)
                if (/^02/.test(numbersOnly)) {
                  if (numbersOnly.length <= 2) {
                    processedValue = numbersOnly;
                  } else if (numbersOnly.length <= 5) {
                    processedValue = numbersOnly.replace(
                      /(\d{2})(\d{1,3})/,
                      "$1-$2"
                    );
                  } else if (numbersOnly.length <= 9) {
                    processedValue = numbersOnly
                      .slice(0, 9)
                      .replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3");
                  } else {
                    processedValue = numbersOnly
                      .slice(0, 10)
                      .replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
                  }
                }

                // 휴대폰 010, 011~019
                else if (/^01[016789]/.test(numbersOnly)) {
                  if (/^010/.test(numbersOnly)) {
                    // 010은 3-4-4
                    if (numbersOnly.length <= 3) {
                      processedValue = numbersOnly;
                    } else if (numbersOnly.length <= 7) {
                      processedValue = numbersOnly.replace(
                        /(\d{3})(\d{1,4})/,
                        "$1-$2"
                      );
                    } else {
                      processedValue = numbersOnly.replace(
                        /(\d{3})(\d{4})(\d{4})/,
                        "$1-$2-$3"
                      );
                    }
                  } else {
                    // 011~019는 3-3-4
                    if (numbersOnly.length <= 3) {
                      processedValue = numbersOnly;
                    } else if (numbersOnly.length <= 6) {
                      processedValue = numbersOnly.replace(
                        /(\d{3})(\d{1,3})/,
                        "$1-$2"
                      );
                    } else {
                      processedValue = numbersOnly.replace(
                        /(\d{3})(\d{3})(\d{4})/,
                        "$1-$2-$3"
                      );
                    }
                  }
                }

                // 지역번호 (031~069)
                else if (/^0[3-6][1-9]/.test(numbersOnly)) {
                  if (numbersOnly.length <= 3) {
                    processedValue = numbersOnly;
                  } else if (numbersOnly.length <= 6) {
                    processedValue = numbersOnly.replace(
                      /(\d{3})(\d{1,3})/,
                      "$1-$2"
                    );
                  } else {
                    processedValue = numbersOnly
                      .slice(0, 11)
                      .replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
                  }
                }

                // 이외 번호는 숫자만 유지(하이픈 제외)
                else {
                  processedValue = numbersOnly;
                }
              } else if (name === "businessNumber") {
                const numbersOnly = value.replace(/[^0-9]/g, "").slice(0, 10);
                if (numbersOnly.length <= 3) {
                  processedValue = numbersOnly;
                } else if (numbersOnly.length <= 5) {
                  processedValue = numbersOnly.replace(
                    /(\d{3})(\d{1,2})/,
                    "$1-$2"
                  );
                } else {
                  processedValue = numbersOnly.replace(
                    /(\d{3})(\d{2})(\d{1,5})/,
                    "$1-$2-$3"
                  );
                }
              } else {
                processedValue = value.replace(/^\s+/, ""); // 앞 공백 제거
              }

              onChange(processedValue);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur();
            }}
          />
        )}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </FieldWrapper>
  );
};

export default InputField;
