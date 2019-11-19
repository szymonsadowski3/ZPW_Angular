import { Injectable } from '@angular/core';
import {Wycieczka} from '../models/wycieczka.model';

@Injectable({
  providedIn: 'root'
})
export class KoszykService {

  produkty;

  constructor() {
    this.produkty = [];
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

  addProduct(product: Wycieczka) {
    const foundProduct = this.produkty.filter(item => item.trip === product);

    if (foundProduct.length === 0) {
      this.produkty.push({trip: product, count: 0});
    }
  }

  // incrementProduct(product: Wycieczka) {
  //   const foundProduct = this.produkty.filter(item => item.trip === product);
  //
  //   if (!foundProduct) {
  //     this.produkty.push({trip: product, count: 1});
  //   } else {
  //     foundProduct.count += 1;
  //   }
  // }
  //
  // decrementProduct(product: Wycieczka) {
  //   const foundProduct = this.produkty.filter(item => item.trip === product);
  //
  //   if (foundProduct) {
  //     if (foundProduct.count <= 1) {
  //       this.deleteTrip(foundProduct);
  //     }
  //
  //     foundProduct.count -= 1;
  //   }
  // }

  deleteTrip(product: Wycieczka) {
    this.produkty = this.produkty.filter(item => item.trip != product);
  }
}
