import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {fakeWycieczki} from "../../data/fake.dane";
import {FirebaseService} from "../../services/firebase.service";
import {Wycieczka} from "../../models/wycieczka.model";
import {RestService} from "../../services/rest.service";
import {IDKEY} from 'src/app/const';

@Component({
  selector: 'admin-panel-component',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private firebaseService: RestService,
  ) {
  }

  wycieczki = [];
  IDKEY = IDKEY;

  addExampleTrips() {
    fakeWycieczki.forEach((wycieczka: any) => {
      this.firebaseService.addTrip(wycieczka);
    });
  }

  removeAllTrips() {
    this.firebaseService.deleteTrips();
  }

  ngOnInit() {
    this.spinner.show();
    this.firebaseService.getAllTrips().subscribe((products: Wycieczka[]) => {
      this.wycieczki = products;
      this.spinner.hide();
    });
  }

  removeTrip(wycieczka: any) {
    this.firebaseService.deleteTrip(wycieczka);
  }
}
