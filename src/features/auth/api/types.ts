export interface LoginDto {
  email: string;
  password: string;
}

export interface UserDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: UserDto;
}

export enum Currency {
  USD = 0,
  BLR = 1,
  EUR = 2
}

export interface UserAccount {
  id: number;
  name: string;
  currentBalance: number;
  currency: Currency;
  isActive: boolean;
  userId: number;
}
export interface UserAccountDto {
  name: string;
  currentBalance: number;
  currency: Currency;
  isActive: boolean;
  userId: number;
}