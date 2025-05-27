import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  vendorId?: string;
  email: string;
  name: string;
  provider: string;
  role: string;
  gender: "MALE" | "FEMALE" | "SECRET";
  profileImageUrl: string | null;
  introduction: string | null;
  phoneNumber: string | null;
  marketingConsent: boolean;
  marketingConsentDate: string | null;
  instagram: string | null;
  kakao: string | null;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  updateUser: (partial: Partial<User>) => void;
  clearUser: () => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateUser: (partial) =>
        set((state) => ({
          user: {
            ...state.user!,
            ...partial,
          },
        })),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-store",
    }
  )
);
