import { stat } from 'fs';
import { create } from 'zustand';

//#region StorageCart
type CartProductType = {
  title: string, 
  price: number, 
  quantity: number
}

type StorageCart = {
  products: CartProductType[],
  AddToCart: (product:CartProductType) => void,
  RemoveFromCart: (product:CartProductType | undefined) => void,
  IncrementQuantity: (product:CartProductType) => void,
  DecrementQuantity: (product:CartProductType) => void,
  isOpenCartModal: boolean,
  setIsOpenCartModal: (value:boolean) => void,
}

export const useStorageCart = create<StorageCart>()((set) => ({
  products: [],
  AddToCart: (product:CartProductType) => set((state) => ({ products: state.products.find((el) => el.title === product.title) ? state.products.map((el) => {
    if (el.title === product.title) {
      return { ...el, quantity: el.quantity + product.quantity };
    } else {
      return el;
    }}) : state.products.concat(product)
  })),
  RemoveFromCart: (product:CartProductType | undefined) => set((state) => ({ products: product ? state.products.filter((el) => el.title !== product.title) : state.products })),
  IncrementQuantity: (product:CartProductType) => set((state) => ({ products: state.products.map((el) => {
    if (el.title === product.title) {
      return { ...el, quantity: el.quantity + 1 };
    } else {
      return el;
    }})
  })),
  DecrementQuantity: (product:CartProductType) => set((state) => ({ products: state.products.map((el) => {
    if (el.title === product.title) {
      return { ...el, quantity: el.quantity !== 1 ? el.quantity - 1 : el.quantity };
    } else {
      return el;
    }})
  })),
  isOpenCartModal: false,
  setIsOpenCartModal: (value:boolean) => set((state) => ({ isOpenCartModal: value })),
}));
//#endregion
