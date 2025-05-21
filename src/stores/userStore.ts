import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  nickname: string;
  profileImage: string | null;
  setNickname: (nickname: string) => void;
  setProfileImage: (url: string | null) => void;
}

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      nickname: "",
      profileImage: null,
      setNickname: (nickname) => set({ nickname }),
      setProfileImage: (url) => set({ profileImage: url }),
    }),
    {
      name: "user-store",
    }
  )
);
