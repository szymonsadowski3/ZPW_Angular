import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  getUser() {
    return this.authService.user ? this.authService.user.email: '';
  }

  logout() {
    this.spinner.show();
    this.authService.logout().then(() => {
      this.spinner.hide();
      this.router.navigate(['/login']);
    });
  }
}
