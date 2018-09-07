import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './shared/services/user.service';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  role = "";
  constructor(private router: Router, private userService: UserService) { }
  // async
   canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log("data");
    const id = localStorage.getItem('id')
    // await this.userService.getUserById(id).subscribe(res => {
    //   this.role = res.json().role

    // });
    let data = jwt_decode(localStorage.getItem("token")); // decode token
 
    if ( data.data.role != 'admin') {

      this.router.navigate(['blog']);
      return false;
    }
    // this.router.navigate(['blog']);
    return true;
  }
}
