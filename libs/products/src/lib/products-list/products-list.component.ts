import { Component, OnInit } from '@angular/core';
import { CartsFacade } from '@tul/carts';
import { ItemsFacade } from '@tul/items';
import { ProductsFacade } from '../+state/products/products.facade';
import { Product } from '../+state/products/products.models';

@Component({
  selector: 'tul-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  products$ = this.productsFacade.allProducts$;

  constructor(
    private productsFacade: ProductsFacade,
    private itemssFacade: ItemsFacade,
    private cartsFacade: CartsFacade
  ) {}

  ngOnInit(): void {
    this.productsFacade.loadAllProducts();
  }

  onAddItemEvent(product: Product) {
    this.cartsFacade
      .getCurrentCart()
      .then((cartId) => this.itemssFacade.addItem(product.id, cartId));
  }
}
