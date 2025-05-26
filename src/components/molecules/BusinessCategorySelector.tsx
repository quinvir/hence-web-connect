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
  flex-wrap: wrap;
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

const options = [
  { value: "FOOD_TRUCK", label: "푸드트럭" },
  { value: "FLEA_MARKET", label: "플리마켓" },
  { value: "PLAY", label: "놀이" },
  { value: "PERFORMANCE", label: "공연" },
  { value: "ETC", label: "기타" },
];

interface Props {
  control: Control<any>;
  errorMessage?: string;
}

const BusinessCategorySelector = ({ control, errorMessage }: Props) => {
  return (
    <Wrapper>
      <Label>사업 카테고리</Label>
      <Controller
        name="businessCategory"
        control={control}
        render={({ field }) => (
          <ButtonGroup>
            {options.map((item) => (
              <Option
                key={item.value}
                type="button"
                selected={field.value === item.value}
                onClick={() => field.onChange(item.value)}
              >
                {item.label}
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

export default BusinessCategorySelector;
