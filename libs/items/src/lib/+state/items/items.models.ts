/**
 * Interface for the 'Items' data
 */
export interface ItemsEntity {
  id: string | number; // Primary ID
}

export interface Item {
  productId: string;
  cartId: string;
  quantity: number;
  userId: string;
}
