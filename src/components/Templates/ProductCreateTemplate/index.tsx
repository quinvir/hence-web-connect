// ProductCreateTemplate.tsx
import { useState } from "react";
import {
  ButtonBox,
  Container,
  Form,
  HeaderRow,
  ImageBox,
  InputFieldBox,
  ItemBox,
  RemoveButtonBox,
} from "./styles";
import Button from "../../atoms/Button";
import { Controller, useFieldArray, useForm } from "react-hook-form";

type Product = {
  image: string;
  name: string;
  price: string;
};

const ProductCreateTemplate = () => {
  const { control, handleSubmit, watch } = useForm<{ products: Product[] }>({
    defaultValues: {
      products: [{ image: "", name: "", price: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const [mode, setMode] = useState<"edit" | "view">("edit");

  const [isFocused, setIsFocused] = useState<{ [key: number]: boolean }>({});

  const [products, setProducts] = useState([
    { image: "/", name: "", price: "" },
  ]);

  const onAddProductHandler = () => {
    setProducts([...products, { image: "", name: "", price: "" }]);
  };

  const onDeleteProductHandler = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const onChange = (index: number, field: "name" | "price", value: string) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  const formatPrice = (value: string) => {
    const number = Number(value.replace(/[^0-9]/g, ""));
    return number.toLocaleString("ko-KR") + "원";
  };

  const unformatPrice = (formatted: string) => {
    return formatted.replace(/[^0-9]/g, "");
  };

  const onSubmit = (data: any) => {
    const parsed = data.products.map((p: Product) => ({
      ...p,
      price: Number(p.price),
    }));

    console.log("판매 물품 data", parsed);
    setMode("view");
  };

  return (
    <Container>
      <h1>판매 물품 추가하기</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ItemBox>
          <HeaderRow $mode={mode}>
            <div>사진</div>
            <div>판매 품목 이름</div>
            <div>가격</div>
            {mode === "view" && <div />}
          </HeaderRow>

          {fields.map((field, index) => {
            const currentImage = watch(`products.${index}.image`);
            const isThumbnail =
              !!currentImage &&
              currentImage !== "/assets/images/img/upload-image.png";

            return (
              <InputFieldBox key={field.id} $mode={mode}>
                <ImageBox htmlFor={`file-${index}`} $isThumbnail={isThumbnail}>
                  <img
                    src={currentImage || "/assets/images/img/upload-image.png"}
                    alt="Upload product"
                  />

                  <Controller
                    name={`products.${index}.image`}
                    control={control}
                    render={({ field: fileField }) => (
                      <input
                        id={`file-${index}`}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = URL.createObjectURL(file);
                            fileField.onChange(url);
                          }
                        }}
                      />
                    )}
                  />
                </ImageBox>

                <Controller
                  name={`products.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="판매하실 품목의 이름을 입력하세요"
                    />
                  )}
                />

                <Controller
                  name={`products.${index}.price`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="판매하실 가격을 입력하세요"
                      value={
                        field.value === "" || isFocused[index]
                          ? field.value
                          : formatPrice(field.value)
                      }
                      onFocus={() => {
                        setIsFocused((prev) => ({ ...prev, [index]: true }));
                      }}
                      onBlur={() => {
                        setIsFocused((prev) => ({ ...prev, [index]: false }));
                        field.onChange(unformatPrice(field.value)); // 정리된 숫자만 저장
                      }}
                      onChange={(e) => {
                        const onlyNum = unformatPrice(e.target.value);
                        field.onChange(onlyNum); // 숫자만 저장
                      }}
                      inputMode="numeric"
                    />
                  )}
                />

                {mode === "view" ? (
                  <RemoveButtonBox>
                    <button type="button" onClick={() => remove(index)}>
                      <img
                        src="/assets/images/icon/icon_remove.svg"
                        alt="Remove"
                      />
                    </button>
                  </RemoveButtonBox>
                ) : (
                  <div />
                )}
              </InputFieldBox>
            );
          })}
        </ItemBox>

        <Button
          type="button"
          $backgroudnColor="#E6E6E64D"
          $textColor="#646464"
          onClick={() =>
            append({
              image: "/assets/images/img/upload-image.png",
              name: "",
              price: "",
            })
          }
        >
          판매 품목 추가하기
        </Button>

        <ButtonBox>
          <Button
            width="300px"
            $backgroudnColor="#2B77F5"
            $textColor="#FFFFFF"
            type="submit"
          >
            판매 물품 저장하기
          </Button>
        </ButtonBox>
      </Form>
    </Container>
  );
};

export default ProductCreateTemplate;
