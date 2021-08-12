import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import firebase from 'firebase';
import { mergeMap } from 'rxjs/operators';
import { Cart, CartStatus } from './+state/carts/carts.models';

const CARTS_COLLECTION = 'carts';

@Injectable({ providedIn: 'root' })
export class CartService {
  private user!: firebase.User | null;
  private cartId!: string | null;

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth
  ) {
    this.angularFireAuth.authState.subscribe((user) => (this.user = user));
  }

  getCart(): Observable<Cart> {
    return from(this.getOrCreateCartId()).pipe(
      mergeMap((cartId) =>
        this.angularFirestore
          .collection<Cart>(CARTS_COLLECTION)
          .doc(cartId)
          .valueChanges({ idField: 'id' })
      )
    );
  }

  checkout() {
    return from(
      this.angularFirestore
        .collection<Cart>(CARTS_COLLECTION)
        .doc(this.getCartIdFromLocalStorage())
        .update({ status: CartStatus.completed })
    );
  }

  removeCart() {
    this.removeCartFromLocalStorage();
  }

  async getOrCreateCartId() {
    let cartId = this.getCartIdFromLocalStorage();
    if (cartId) return cartId;

    let result = await this.createDefaultCart();
    this.setCartIdInLocalStorage(result.id);

    return result.id;
  }

  private getCartIdFromLocalStorage() {
    return localStorage.getItem('cartId');
  }

  private setCartIdInLocalStorage(cartId: string) {
    localStorage.setItem('cartId', cartId);
  }

  private removeCartFromLocalStorage(): void {
    return localStorage.removeItem('cartId');
  }

  private createDefaultCart() {
    return this.createCart({
      status: CartStatus.pending,
      userId: this.user.uid,
    });
  }

  private createCart(cart: Cart) {
    return this.angularFirestore.collection<Cart>(CARTS_COLLECTION).add(cart);
  }
}
