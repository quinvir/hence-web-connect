import { useMutation } from "@tanstack/react-query";
import { ProductPayload } from "../../types/product";
import { createProduct } from "../../api/product/product.api";

interface CreateProductArgs {
  vendorId: string;
  payload: ProductPayload;
}

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: ({ vendorId, payload }: CreateProductArgs) =>
      createProduct(vendorId, payload),
    onSuccess: (data) => {
      console.log("상품 등록 성공", data);
    },
    onError: (error) => {
      console.error("상품 등록 실패", error);
    },
  });
};
