import { useEffect, useState } from "react";
import {
  ButtonBox,
  Container,
  Form,
  HeaderRow,
  InputFieldBox,
  ItemBox,
  RemoveButtonBox,
} from "./styles";
import Button from "../../atoms/Button";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import AlertModal from "../../molecules/AlertModal";
import ImageUploader from "../../molecules/ImageUploader";
import { useCreateProduct } from "../../../hooks/product/useCreateProduct";
import { useBusinessUserStore } from "../../../stores/businessUserStore";
import {
  deleteProduct,
  getProductList,
  updateProduct,
} from "../../../api/product/product.api";

type Product = {
  id?: string;
  image: string;
  name: string;
  price: string;
};

const ProductCreateTemplate = () => {
  const { control, handleSubmit, watch, reset } = useForm<{
    products: Product[];
  }>({
    defaultValues: {
      products: [{ image: "", name: "", price: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const [mode, setMode] = useState<"edit" | "view">("edit");

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("알림");
  const [alertMessage, setAlertMessage] = useState<
    string | string[] | React.ReactNode
  >("");

  const showAlert = (
    title: string,
    message: string | string[] | React.ReactNode
  ) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const handleAlertConfirm = () => {
    setAlertOpen(false);
  };

  const [isFocused, setIsFocused] = useState<{ [key: number]: boolean }>({});

  const formatPrice = (value: string) => {
    const number = Number(value.replace(/[^0-9]/g, ""));
    return number.toLocaleString("ko-KR") + "원";
  };

  const unformatPrice = (formatted: string) => {
    return formatted.replace(/[^0-9]/g, "");
  };

  const { mutateAsync: createProduct } = useCreateProduct();

  const [hasServerProducts, setHasServerProducts] = useState(false);

  const [deleteTargetIndex, setDeleteTargetIndex] = useState<number | null>(
    null
  );

  const handleDeleteProduct = async (index: number) => {
    const vendorId = useBusinessUserStore.getState().businessUser?.id;
    const targetProduct = watch(`products.${index}`);
    const name = targetProduct?.name;
    const deletedName = name ? `${name}` : "해당 아이템";

    if (!vendorId) {
      showAlert("오류", "판매자 정보가 없습니다.");
      return;
    }

    try {
      if (targetProduct?.id && hasServerProducts) {
        // 수정인 경우에만 API 호출
        await deleteProduct(vendorId, targetProduct.id);
      }

      remove(index);
      setDeleteTargetIndex(null);

      if (hasServerProducts) {
        showAlert(
          "삭제 완료",
          deletedName ? (
            <>
              <span style={{ fontWeight: 700 }}>{deletedName}</span>
              {name ? "이(가)" : "이"} 삭제되었어요
            </>
          ) : (
            "해당 아이템이 삭제되었어요"
          )
        );
      }
    } catch (error) {
      console.error("상품 삭제 실패", error);
      showAlert("삭제 실패", "상품 삭제 중 오류가 발생했어요");
    }
  };

  useEffect(() => {
    const vendorId = useBusinessUserStore.getState().businessUser?.id;
    if (!vendorId) return;

    const fetchProducts = async () => {
      try {
        const products = await getProductList(vendorId);

        if (products.length > 0) {
          const formProducts = products.map((p) => ({
            id: p.id,
            image: p.thumbImageUrl ?? undefined,
            name: p.name,
            price: p.price.toString(),
          }));

          reset({ products: formProducts });
          setHasServerProducts(true);
          setMode("edit");
        } else {
          reset({
            products: [
              {
                image: "/assets/images/img/upload-image.png",
                name: "",
                price: "",
              },
            ],
          });
          setHasServerProducts(false);
          setMode("edit");
        }
      } catch (error) {
        console.error("상품 목록 불러오기 실패", error);
        showAlert("에러", "상품 목록을 불러오는 중 오류가 발생했어요.");
      }
    };

    fetchProducts();
  }, []);

  const onSubmit = async (data: any) => {
    // 기존 입력 필드까지 삭제하여 입력한 상품이 1개도 없을 경우
    if (data.products.length === 0) {
      showAlert("입력 오류", "최소 1개 이상의 판매 품목을 입력해주세요.");
      return;
    }

    // 이름, 가격 비어있을 경우
    const hasInvalid = data.products.some((p: Product) => {
      return !p.name.trim() || !p.price.trim();
    });

    if (hasInvalid) {
      showAlert("입력 오류", "모든 판매 품목에 이름과 가격을 입력해주세요");
      return;
    }

    const businessUser = useBusinessUserStore.getState().businessUser;
    const vendorId = businessUser?.id;

    if (!vendorId) {
      showAlert("등록 실패", "판매자 정보가 없습니다.");
      return;
    }

    try {
      for (const product of data.products) {
        const payload = {
          name: product.name,
          price: Number(product.price),
          thumbImageUrl: product.image,
        };

        if (product.id) {
          await updateProduct(vendorId, product.id, payload);
        } else {
          await createProduct({ vendorId, payload });

          // 등록 후 바로 edit 모드로 전환
          const updated = await getProductList(vendorId);
          const formProducts = updated.map((p) => ({
            id: p.id,
            image: p.thumbImageUrl ?? undefined,
            name: p.name,
            price: p.price.toString(),
          }));
          reset({ products: formProducts });
        }
      }

      showAlert("저장 완료", "상품이 저장되었어요.");
      setMode("edit");
    } catch (error) {
      console.error("상품 저장 실패", error);
      showAlert("상품 저장 실패", "다시 시도해주세요.");
    }
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
            {mode === "edit" && <div />}
          </HeaderRow>

          {alertOpen && (
            <AlertModal
              type="confirmOnly"
              title={alertTitle}
              message={alertMessage}
              onConfirm={handleAlertConfirm}
              onCancel={handleAlertConfirm}
            />
          )}

          {deleteTargetIndex !== null &&
            (hasServerProducts ? (
              <AlertModal
                type="cancelConfirm"
                title="삭제"
                message={
                  <>
                    <span style={{ fontWeight: 700 }}>
                      {watch(`products.${deleteTargetIndex}.name`) ||
                        "해당 아이템"}
                    </span>
                    {watch(`products.${deleteTargetIndex}.name`)
                      ? "을(를)"
                      : "을"}{" "}
                    삭제하시겠어요?
                    <br />
                    삭제된 아이템은 즉시 리스트에서 삭제됩니다
                  </>
                }
                onConfirm={() => {
                  if (deleteTargetIndex !== null) {
                    handleDeleteProduct(deleteTargetIndex);
                  }
                }}
                onCancel={() => setDeleteTargetIndex(null)}
                confirmText="삭제하기"
                cancelText="취소"
              />
            ) : (
              // 서버 상품이 없으면 바로 삭제 실행 후 index 초기화
              (() => {
                handleDeleteProduct(deleteTargetIndex);
                return null;
              })()
            ))}

          {fields.map((field, index) => {
            const showDelete =
              mode === "edit" && (hasServerProducts || fields.length > 1);
            return (
              <InputFieldBox
                key={field.id}
                $mode={mode}
                $showDelete={showDelete}
              >
                <Controller
                  name={`products.${index}.image`}
                  control={control}
                  render={({ field }) => (
                    <ImageUploader
                      value={field.value}
                      onChange={field.onChange}
                      variant="product"
                      inputId={`product-image-${index}`}
                      onFileTooLarge={() =>
                        showAlert(
                          "파일 용량 초과",
                          "2MB 이하만 업로드 가능해요."
                        )
                      }
                      onError={(msg) => showAlert("업로드 실패", msg)}
                    />
                  )}
                />
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

                {(hasServerProducts || fields.length > 1) && (
                  <RemoveButtonBox>
                    <button
                      type="button"
                      onClick={() => setDeleteTargetIndex(index)}
                    >
                      <img
                        src="/assets/images/icon/icon_remove.svg"
                        alt="Remove"
                      />
                    </button>
                  </RemoveButtonBox>
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
