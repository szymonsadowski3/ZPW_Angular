import {Injectable, OnInit} from '@angular/core';
import {Wycieczka} from '../models/wycieczka.model';
import {fakeWycieczki} from '../data/fake.dane';
import {HttpClient} from '@angular/common/http';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  data;

  constructor(private db: AngularFireDatabase) {
    this.data = this.db.list('/wycieczki');
    console.dir(this.data);
  }

  fetchProducts() {
    return this.db.list('/wycieczki').valueChanges();
  }

  getProduct(id: number) {
    return this.db.list('/wycieczki').valueChanges();
  }

  addProduct(product: Wycieczka) {
    this.data.push(product);
  }

  deleteProduct(product: Wycieczka) {
    // this.wycieczki = this.wycieczki.filter(item => item !== product);
  }

  updatedata(cos: any): void {
    this.db.object('/test/' + cos.$key).update({});
  }

  deletedata(cos: any): void {
    this.db.object('/test/' + cos.$key).remove();
  }
}
