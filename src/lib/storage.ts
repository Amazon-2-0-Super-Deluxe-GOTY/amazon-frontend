import { create, useStore } from "zustand";
import { createStore as createVanillaStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

//#region StorageCart
type StorageCart = {
  isOpenCartModal: boolean;
  setIsOpenCartModal: (value: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
};

export const useStorageCart = create<StorageCart>()((set) => ({
  isOpenCartModal: false,
  setIsOpenCartModal: (value: boolean) =>
    set((state) => ({ isOpenCartModal: value })),
  openModal() {
    set({ isOpenCartModal: true });
  },
  closeModal() {
    set({ isOpenCartModal: false });
  },
}));
//#endregion

interface AuthStore {
  token?: string;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const authStore = createVanillaStore<AuthStore>()(
  persist(
    (set, get) => ({
      setToken(token) {
        set({ token });
      },
      clearToken() {
        set({ token: undefined });
      },
    }),
    { name: "auth" }
  )
);

export const useAuthStore = <T>(selector: (state: AuthStore) => T) =>
  useStore(authStore, selector);
