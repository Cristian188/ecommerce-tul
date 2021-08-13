import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@tul/products';

@Component({
  selector: 'tul-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() data: Product;
  @Output() addToCartEvent = new EventEmitter<Product>();

  constructor() {}

  onAddToCartClick() {
    this.addToCartEvent.emit(this.data);
  }
}
