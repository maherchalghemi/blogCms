import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../../models/user';
import { Token } from '@angular/compiler';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : Http) { }


  login(user: User) {


    return this.http.post('http://127.0.0.1:3002/auth/login', user).pipe(map(res => {
     
      
      localStorage.setItem('role', res.json().user.role);
      localStorage.setItem('id', res.json().user._id);  
    localStorage.setItem('token', res.json().userToken);
      
      return res;
    }));


  }

  register(user: User) {

   
    return this.http.post('http://127.0.0.1:3002/auth/register', user).pipe(map(res => {
      localStorage.setItem('token', res.json().userToken );
      localStorage.setItem('id', res.json().user._id);
      localStorage.setItem('role', res.json().user.role);
      return res;
    }));
  }

}
