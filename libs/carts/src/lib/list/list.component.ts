import { Component, OnInit } from '@angular/core';
import { CartsFacade } from '../+state/carts/carts.facade';
import { ItemsFacade } from '@tul/items';
import { ProductsFacade } from '@tul/products';

@Component({
  selector: 'tul-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(
    private cartsFacade: CartsFacade,
    private itemsFacade: ItemsFacade,
    private productsFacade: ProductsFacade
  ) {}
  cartLoaded$ = this.cartsFacade.loaded$;
  items$ = this.itemsFacade.allItems$;
  countItems$ = this.itemsFacade.countItems$;

  quantityOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
  ];

  ngOnInit(): void {
    this.cartsFacade.loadCart();
  }

  onCheckoutClick() {
    this.cartsFacade.checkoutCart();
  }

  onDeleteClick(itemId: string, quantity: number) {
    this.itemsFacade.removeItem(itemId);
  }

  onQuantityChange(itemId: string, quantity: number) {
    this.itemsFacade.updateItem(itemId, quantity);
  }

  getProduct(productId: string) {
    return this.productsFacade.getProductById(productId);
  }
}
