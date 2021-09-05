import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';

import { AuthService } from './auth.sevice';
import { NotificationsService } from './notifications.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private notificationsService: NotificationsService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.notificationsService.error(`You don't have sufficient access rights to access this page `);
    this.router.navigate(['/login']);
    return false;
  }
}
