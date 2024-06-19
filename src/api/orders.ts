import { authStore } from "@/lib/storage";
import { ApiResponse, ApiValidationErrors } from "./types";

export interface OrderProduct {
  name: string;
  productId: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface Order {
  paymentMethod: string;
  country: string;
  state: string;
  city?: string;
  postIndex: string;
}

export function createOrder(
  values: Order
): Promise<
  ApiResponse<[[201, Order], [400, ApiValidationErrors], [500, null]]>
> {
  const token = authStore.getState().token;
  return fetch("/api/orders", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  }).then((r) => r.json());
}
