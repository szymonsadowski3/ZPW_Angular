import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.checkIsUserAnAdministrator();
  }

  getUser() {
    return this.authService.getUser();
  }

  logout() {
    this.spinner.show();
    this.authService.logout().then(() => {
      this.spinner.hide();
      this.router.navigate(['/login']);
    });
  }

  checkIsUserAnAdministrator() {
    setTimeout(() => {
      this.firebaseService.getRole(this.getUser()).subscribe(roles => {
        this.isAdmin = ((roles.length > 0) && roles[0].role === 'admin');
      });
    }, 500);
  }
}
