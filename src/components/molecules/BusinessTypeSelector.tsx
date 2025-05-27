import { Control, Controller } from "react-hook-form";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 400;
  color: #000;
  font-family: "SUIT Variable";
  line-height: 140%;
  letter-spacing: -0.25px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const Option = styled.button<{ selected: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid ${({ selected }) => (selected ? "#2B77F5" : "#D9D9D9")};
  background-color: ${({ selected }) => (selected ? "#2B77F5" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#222")};
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
`;

interface Props {
  control: Control<any>;
  errorMessage?: string;
}

const BusinessTypeSelector = ({ control, errorMessage }: Props) => {
  const options = [
    { value: "CORPORATION", label: "법인 사업자" },
    { value: "INDIVIDUAL", label: "개인 사업자" },
    { value: "SIMPLIFIED", label: "간이과세자" },
  ];

  return (
    <Wrapper>
      <Label>사업 형태</Label>
      <Controller
        name="businessType"
        control={control}
        render={({ field }) => (
          <ButtonGroup>
            {options.map((opt) => (
              <Option
                key={opt.value}
                type="button"
                selected={field.value === opt.value}
                onClick={() => field.onChange(opt.value)}
              >
                {opt.label}
              </Option>
            ))}
          </ButtonGroup>
        )}
      />
      {errorMessage && (
        <p style={{ fontSize: "12px", color: "#e60000" }}>{errorMessage}</p>
      )}
    </Wrapper>
  );
};

export default BusinessTypeSelector;
