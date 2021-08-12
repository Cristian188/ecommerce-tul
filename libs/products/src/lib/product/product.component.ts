import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@tul/products';
import { ProductsFacade } from '../+state/products/products.facade';

@Component({
  selector: 'tul-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() data: Product;

  constructor(private productsFacade: ProductsFacade) {}

  onAddToCartClick() {
    // this.productsFacade.addProductToCart({ productId: this.data.id });
  }
}
