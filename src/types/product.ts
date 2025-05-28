export interface ProductPayload {
  name: string;
  description?: string;
  price: number;
  thumbImageUrl: string;
}

export interface ProductResponse {
  id: string;
  name: string;
  description: string | null;
  price: number;
  thumbImageUrl: string | null;
  vendorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListData {
  items: ProductResponse[];
  total: number;
  hasMore: boolean;
  nextCursor: string | null;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export type GetProductListResponse = ApiResponse<ProductListData>;
