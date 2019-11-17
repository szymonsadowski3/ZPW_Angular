import { Injectable } from '@angular/core';
import {fakeWycieczki} from '../data/fake.dane';
import {Wycieczka} from '../models/wycieczka.model';

@Injectable({
  providedIn: 'root'
})
export class KoszykService {

  produkty: Wycieczka[];

  constructor() {
    this.produkty = [];
    this.produkty.push(fakeWycieczki[0]);
    this.produkty.push(fakeWycieczki[1]);
  }

  getProducts() {
    return this.produkty;
  }

  getProduct(nazwa: string) {
    return this.produkty.filter(item => item.nazwa === nazwa);
  }

  addProduct(product: Wycieczka) {
    this.produkty.push(product);
  }

  deleteProduct(product: Wycieczka) {
    this.produkty = this.produkty.filter(item => item !== product);
  }
}
