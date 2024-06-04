import { create, useStore } from "zustand";
import { createStore as createVanillaStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import type { User } from "@/api/types";

//#region StorageCart
type CartProductType = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

type StorageCart = {
  products: CartProductType[];
  addToCart: (product: CartProductType) => void;
  buyNow: (product: CartProductType) => void;
  removeFromCart: (productId: string) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  isOpenCartModal: boolean;
  setIsOpenCartModal: (value: boolean) => void;
};

export const useStorageCart = create<StorageCart>()((set) => ({
  products: [],
  isOpenCartModal: false,
  setIsOpenCartModal: (value: boolean) =>
    set((state) => ({ isOpenCartModal: value })),
  addToCart: (product: CartProductType) =>
    set((state) => ({
      products: state.products.find((el) => el.id === product.id)
        ? state.products.map((el) => {
            if (el.title === product.title) {
              return { ...el, quantity: el.quantity + product.quantity };
            } else {
              return el;
            }
          })
        : state.products.concat(product),
    })),
  buyNow: (product: CartProductType) =>
    set((state) => ({
      products: state.products.find((el) => el.id === product.id)
        ? state.products.map((el) => {
            if (el.title === product.title) {
              return { ...el, quantity: el.quantity + product.quantity };
            } else {
              return el;
            }
          })
        : state.products.concat(product),
      isOpenCartModal: true,
    })),
  removeFromCart: (productId: string) =>
    set((state) => ({
      products: productId
        ? state.products.filter((el) => el.id !== productId)
        : state.products,
    })),
  incrementQuantity: (productId: string) =>
    set((state) => ({
      products: state.products.map((el) => {
        if (el.id === productId) {
          return { ...el, quantity: el.quantity + 1 };
        } else {
          return el;
        }
      }),
    })),
  decrementQuantity: (productId: string) =>
    set((state) => ({
      products: state.products.map((el) => {
        if (el.id === productId) {
          return {
            ...el,
            quantity: el.quantity !== 1 ? el.quantity - 1 : el.quantity,
          };
        } else {
          return el;
        }
      }),
    })),
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
