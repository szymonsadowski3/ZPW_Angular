import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {fakeWycieczki} from "../../data/fake.dane";
import {FirebaseService} from "../../services/firebase.service";

@Component({
  selector: 'admin-panel-component',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private firebaseService: FirebaseService,
  ) {}

  addExampleTrips() {
    fakeWycieczki.forEach((wycieczka: any) => {
      this.firebaseService.addTrip(wycieczka);
    });
  }
}
