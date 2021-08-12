/**
 * Interface for the 'Carts' data
 */
export interface CartsEntity {
  id?: string; // Primary ID
}
export enum CartStatus {
  pending,
  completed,
}

export interface Cart extends CartsEntity {
  userId: string;
  status: CartStatus;
}
