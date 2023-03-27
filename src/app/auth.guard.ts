import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private router:Router) {
}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const username = localStorage.getItem('username');
    if (username) {
      return true;
    } else {
      Swal.fire({
        title: 'Alto!',
        text: 'No podes entrar sin iniciar sesion',
        imageUrl: '/assets/perrosofa.jpg',
        imageWidth: 300,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
      return this.router.parseUrl('');
    }
  }


}
