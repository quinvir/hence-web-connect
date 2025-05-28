import { useQuery } from "@tanstack/react-query";
import { getProductList } from "../../api/product/product.api";
import { useBusinessUserStore } from "../../stores/businessUserStore";
import { ProductResponse } from "../../types/product";

export const useProductList = () => {
  const vendorId = useBusinessUserStore((state) => state.businessUser?.id);

  return useQuery<ProductResponse[]>({
    queryKey: ["productList", vendorId],
    queryFn: () => {
      if (!vendorId) {
        return Promise.reject(new Error("vendorId가 없습니다."));
      }
      return getProductList(vendorId);
    },
    enabled: !!vendorId,
    staleTime: 1000 * 60 * 5,
  });
};
