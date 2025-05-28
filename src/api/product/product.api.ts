import {
  GetProductListResponse,
  ProductPayload,
  ProductResponse,
} from "../../types/product";
import client from "../client";

// 상품 등록
export const createProduct = async (
  vendorId: string,
  data: ProductPayload
): Promise<ProductResponse> => {
  const response = await client.post(
    `/api/v1/vendor/${vendorId}/product`,
    data
  );

  // console.log("판매 물품 등록 response", response);
  return response.data;
};

// 상품 목록 조회
export const getProductList = async (
  vendorId: string
): Promise<ProductResponse[]> => {
  const response = await client.get<GetProductListResponse>(
    `/api/v1/vendor/${vendorId}/product`
  );

  return response.data.data.items;
};

// 특정 상품 조회
export const getProductDetail = async (
  vendorId: string,
  productId: string
): Promise<ProductResponse> => {
  const response = await client.get(
    `/api/v1/vendor/${vendorId}/product/${productId}`
  );
  return response.data;
};

// 상품 수정
export const updateProduct = async (
  vendorId: string,
  productId: string,
  data: ProductPayload
): Promise<ProductResponse> => {
  const response = await client.patch(
    `/api/v1/vendor/${vendorId}/product/${productId}`,
    data
  );

  // console.log("상품 수정!", response);
  return response.data;
};

// 상품 삭제
export const deleteProduct = async (
  vendorId: string,
  productId: string
): Promise<void> => {
  await client.delete(`/api/v1/vendor/${vendorId}/product/${productId}`);
};
