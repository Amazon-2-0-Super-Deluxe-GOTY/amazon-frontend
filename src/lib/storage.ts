import { stat } from 'fs';
import { create } from 'zustand';

//#region StorageCart
type CartProductType = {
  id: string,
  title: string, 
  price: number, 
  quantity: number
}

type StorageCart = {
  products: CartProductType[],
  addToCart: (product:CartProductType) => void,
  removeFromCart: (productId:string) => void,
  incrementQuantity: (productId:string) => void,
  decrementQuantity: (productId:string) => void,
  isOpenCartModal: boolean,
  setIsOpenCartModal: (value:boolean) => void,
}

export const useStorageCart = create<StorageCart>()((set) => ({
  products: [],
  addToCart: (product:CartProductType) => set((state) => ({ products: state.products.find((el) => el.id === product.id) ? state.products.map((el) => {
    if (el.title === product.title) {
      return { ...el, quantity: el.quantity + product.quantity };
    } else {
      return el;
    }}) : state.products.concat(product)
  })),
  removeFromCart: (productId:string) => set((state) => ({ products: productId ? state.products.filter((el) => el.id !== productId) : state.products })),
  incrementQuantity: (productId:string) => set((state) => ({ products: state.products.map((el) => {
    if (el.id === productId) {
      return { ...el, quantity: el.quantity + 1 };
    } else {
      return el;
    }})
  })),
  decrementQuantity: (productId:string) => set((state) => ({ products: state.products.map((el) => {
    if (el.id === productId) {
      return { ...el, quantity: el.quantity !== 1 ? el.quantity - 1 : el.quantity };
    } else {
      return el;
    }})
  })),
  isOpenCartModal: false,
  setIsOpenCartModal: (value:boolean) => set((state) => ({ isOpenCartModal: value })),
}));
//#endregion
