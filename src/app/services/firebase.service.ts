import {Injectable} from '@angular/core';
import {Wycieczka} from '../models/wycieczka.model';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  data;

  constructor(private db: AngularFireDatabase) {
    this.data = this.db.list('/wycieczki');
    console.dir(this.data);
  }

  fetchTrips() {
    return this.db.list('/wycieczki').valueChanges();
  }

  getProduct(id: number) {
    return this.db.object(`/wycieczki/${id}/`).valueChanges();
  }

  addProduct(product: Wycieczka) {
    this.data.push(product);
  }

  deleteProduct(product: Wycieczka) {
    // this.wycieczki = this.wycieczki.filter(item => item !== product);
  }

  addTrip(trip: any): void {
    const pushId = this.db.createPushId();
    trip.id = pushId;
    console.log(pushId);
    this.db.object(`/wycieczki/${pushId}`).set(trip);
  }

  addOrder(order: any) {
    const pushId = this.db.createPushId();
    order.id = pushId;
    console.log(pushId);
    this.db.object(`/orders/${pushId}`).set(order);
    return pushId;
  }

  fetchOrders() {
    return this.db.list('/orders').valueChanges();
  }

  updateTrip(tripToUpdate: any, key): void {
    this.db.object(`/wycieczki/${key}`).update(tripToUpdate);
  }

  deletedata(key): void {
    this.db.object(`/wycieczki/${key}`).remove();
  }
}
