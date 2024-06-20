import { authStore, useAuthStore } from "@/lib/storage";
import { ApiResponse, ApiValidationErrors } from "./types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

export interface OrderProduct {
  productId: string;
  name: string;
  imageUrl: string;
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

export interface OrderDetails {
  id: string;
  orderNumber: string;
  customerName: string;
  paymentMethod: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  completedAt: null;
  orderItems: {
    productId: string;
    name: string;
    imageUrl: string;
    quantity: number;
    price: number;
    totalPrice: number;
  }[];
  deliveryAddresses: {
    country: string;
    state: string;
    city?: string;
    postIndex: string;
  }[];
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

export function getOrders({
  pageSize,
  pageIndex,
}: {
  pageSize: number;
  pageIndex: number;
}): Promise<ApiResponse<[[200, OrderDetails[]], [400, ApiValidationErrors], [404, null]]>> {
  const token = authStore.getState().token;
  return fetch(`/api/orders?pageSize=${pageSize}&pageIndex=${pageIndex}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((r) => r.json());
}


export function useOrders() {
  const token = useAuthStore((state) => state.token);

  const orderQuery = useQuery({
    queryKey: ["orders", token],
    queryFn: useCallback(
      () => (!!token ? getOrders({ pageSize: 100, pageIndex: 1 }) : null),
      [token]
    ),
    select(data) {
      return data?.status === 200 ? data.data : undefined;
    },
  });

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess() {
      orderQuery.refetch();
    },
  });

  return {
    orders: orderQuery,
    createOrder: createOrderMutation,
  };
}

