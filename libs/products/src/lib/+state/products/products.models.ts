/**
 * Interface for the 'Products' data
 */
export interface ProductsEntity {
  id: string | number; // Primary ID
}
export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
}
