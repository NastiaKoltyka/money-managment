import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.sevice';
import { User } from './classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<User> {

  constructor(public authService: AuthService) { }
  resolve(
    route: ActivatedRouteSnapshot,state: RouterStateSnapshot): User {
    return this.authService.user
  }
}
