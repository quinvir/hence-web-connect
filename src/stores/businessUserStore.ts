import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BusinessProfileResponse } from "../types/business";

interface BusinessUserState {
  businessUser: BusinessProfileResponse | null;
  setBusinessUser: (profile: BusinessProfileResponse) => void;
  clearBusinessUser: () => void;
}

export const useBusinessUserStore = create(
  persist<BusinessUserState>(
    (set) => ({
      businessUser: null,
      setBusinessUser: (profile) => set({ businessUser: profile }),
      clearBusinessUser: () => set({ businessUser: null }),
    }),
    {
      name: "business-user-store",
    }
  )
);
