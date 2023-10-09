import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UseUserState {
  accessToken?: string;
  setAccessToken: (accessToken: string) => void;
  logout: () => void;
}

export const useUser = create(
  persist<UseUserState>(
    (set) => ({
      setAccessToken: (accessToken: string) => set({ accessToken }),
      logout: () => {
        set({ accessToken: undefined });
      },
    }),
    {
      name: "@hairhub:user",
    }
  )
);
