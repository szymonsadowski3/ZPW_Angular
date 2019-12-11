import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private db: AngularFireDatabase,
              private authService: AuthService,) {
  }

  getAllTrips() {
    return this.db.list('/wycieczki').valueChanges();
  }

  deleteTrips() {
    return this.db.list('/wycieczki').remove();
  }

  getTrip(id) {
    return this.db.object(`/wycieczki/${id}/`).valueChanges();
  }

  deleteTrip(trip) {
    this.db.object(`/wycieczki/${trip.id}`).remove();
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

  getAllOrders() {
    return this.db.list('/orders').valueChanges();
  }

  addRating(trip, newRating) {
    if (!('oceny' in trip)) {
      trip['oceny'] = [];
    }

    trip['oceny'].push({
      ratedBy: this.authService.getUser(),
      rating: newRating
    });

    console.dir(trip);

    this.db.object(`/wycieczki/${trip.id}`).set(trip);
  }

  updateTrip(newWycieczka) {
    this.db.object(`/wycieczki/${newWycieczka.id}`).update(newWycieczka);
  }

  getRole(email) {
    return this.db.list('/roles', (ref: any) => ref.orderByChild('email').equalTo(email)).valueChanges();
  }
}
