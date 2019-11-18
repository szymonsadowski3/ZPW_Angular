import { Injectable } from '@angular/core';
import {fakeWycieczki} from '../data/fake.dane';
import {Wycieczka} from '../models/wycieczka.model';

@Injectable({
  providedIn: 'root'
})
export class KoszykService {

  produkty;

  constructor() {
    this.produkty = [];
    this.produkty.push({trip: fakeWycieczki[0], count: 2});
    this.produkty.push({trip: fakeWycieczki[1], count: 3});
  }

  getProducts() {
    return this.produkty;
  }

  getTotal() {
    let sum = 0;

    for (const product of this.produkty) {
      sum += product.trip.cenaJednostkowa * product.count;
    }

    return sum;
  }

  // getProduct(nazwa: string) {
  //   return this.produkty.filter(item => item.nazwa === nazwa);
  // }

  addProduct(product: Wycieczka) {
    const foundProduct = this.produkty.filter(item => item.trip === product);

    if (!foundProduct) {
      this.produkty.push({trip: product, count: 0});
    }
  }

  incrementProduct(product: Wycieczka) {
    const foundProduct = this.produkty.filter(item => item.trip === product);

    if (!foundProduct) {
      this.produkty.push({trip: product, count: 1});
    } else {
      foundProduct.count += 1;
    }
  }

  decrementProduct(product: Wycieczka) {
    const foundProduct = this.produkty.filter(item => item.trip === product);

    if (foundProduct) {
      if (foundProduct.count <= 1) {
        this.deleteProduct(foundProduct);
      }

      foundProduct.count -= 1;
    }
  }

  deleteProduct(product: Wycieczka) {
    this.produkty = this.produkty.filter(item => item.trip !== product);
  }
}
