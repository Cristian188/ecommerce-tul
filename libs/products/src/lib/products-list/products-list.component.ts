import { Component, OnInit } from '@angular/core';
import { ProductsFacade } from '../+state/products/products.facade';

@Component({
  selector: 'tul-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  products$ = this.productsFacade.allProducts$;

  constructor(private productsFacade: ProductsFacade) {}

  ngOnInit(): void {
    this.productsFacade.loadAllProducts();
  }
}
