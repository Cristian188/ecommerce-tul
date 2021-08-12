import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Product } from './+state/products/products.models';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private user!: firebase.User | null;

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth
  ) {
    this.angularFireAuth.authState.subscribe((user) => (this.user = user));
  }

  getProducts(): Observable<Product[]> {
    return this.angularFirestore
      .collection<Product>('products')
      .valueChanges({ idField: 'id' });
  }
}
