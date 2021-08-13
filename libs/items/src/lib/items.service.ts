import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { from, Observable } from 'rxjs';
import { Item } from './+state/items/items.models';

const ITEMS_COLLECTION = 'items';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  private user!: firebase.User | null;

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth
  ) {
    this.angularFireAuth.authState.subscribe((user) => (this.user = user));
  }

  getItemsFromCartById(cartId: string): Observable<Item[]> {
    return this.angularFirestore
      .collection<Item>(ITEMS_COLLECTION, (ref) =>
        ref.where('cartId', '==', cartId)
      )
      .valueChanges({ idField: 'id' });
  }

  addProductToCartById(productId: string, quantity: number, cartId: string) {
    const item: Item = {
      cartId: cartId,
      productId: productId,
      quantity: quantity,
      userId: this.user.uid,
    };

    return from(
      this.angularFirestore
        .collection<Item>(ITEMS_COLLECTION)
        .add(item)
        .then((x) => x.id)
    );
  }

  removeItemById(itemId: string) {
    return from(
      this.angularFirestore
        .collection<Item>(ITEMS_COLLECTION)
        .doc(itemId)
        .delete()
    );
  }

  updateItemById(itemId: string, quantity: number) {
    return from(
      this.angularFirestore
        .collection<Item>(ITEMS_COLLECTION)
        .doc(itemId)
        .update({ quantity: quantity })
    );
  }
}
