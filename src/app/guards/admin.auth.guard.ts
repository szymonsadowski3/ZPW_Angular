import {Injectable} from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router
}
  from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {FirebaseService} from '../services/firebase.service';
import {checkAdminRole} from '../utils.module';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private firebaseService: FirebaseService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.firebaseService.getRole(this.authService.getUser()).pipe(map(checkAdminRole(this.router)));

    //   .subscribe(roles => {
    //   console.log(((roles.length > 0) && roles[0].role === 'admin'));
    //   if ((roles.length > 0) && roles[0].role === 'admin') {
    //     return true;
    //   } else {
    //     this.router.navigate(['/wycieczki']);
    //
    //     return false;
    //   }
    // });
  }


}
