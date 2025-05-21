import { Controller } from "react-hook-form";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #000;
  font-family: "SUIT Variable";
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.25px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
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
  control: any;
  errorMessage?: string;
}

const MarketingAgreement = ({ control, errorMessage }: Props) => {
  const options = [
    { value: "yes", label: "동의합니다" },
    { value: "no", label: "비 동의합니다" },
  ];

  return (
    <Wrapper>
      <Label>마케팅 수신 활용 동의</Label>
      <Controller
        name="marketingAgree"
        control={control}
        defaultValue="yes"
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

export default MarketingAgreement;
