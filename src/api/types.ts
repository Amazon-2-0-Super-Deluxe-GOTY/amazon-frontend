export type ApiResponse<T extends [number, unknown][]> = {
  [index in keyof T]: {
    status: T[index][0];
    message: string;
    data: T[index][1];
  };
}[number];

export type ApiValidationErrors = {
  propertyName: string;
  errorMessage: string;
}[];

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  birthDate?: string;
  avatarUrl?: string;
  createdAt: Date;
  isAdmin: boolean;
  isDeleted: boolean;
}
