import { Injectable } from '@angular/core';
import {Wycieczka} from '../models/wycieczka.model';
import {fakeWycieczki} from '../data/fake.dane';

@Injectable({
  providedIn: 'root'
})
export class WycieczkiSerwisService {

  wycieczki: Wycieczka[];

  constructor() {
    this.wycieczki = fakeWycieczki;
  }

  getProducts() {
    return this.wycieczki;
  }

  getProduct(nazwa: string) {
    return this.wycieczki.filter(item => item.nazwa === nazwa);
  }

  addProduct(product: Wycieczka) {
    this.wycieczki.push(product);
  }

  deleteProduct(product: Wycieczka) {
    this.wycieczki = this.wycieczki.filter(item => item !== product);
  }
}
