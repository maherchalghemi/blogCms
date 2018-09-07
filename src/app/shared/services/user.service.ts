import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : Http) { }


  uploadImg(data){
    return this.http.post('http://127.0.0.1:3002/user/upload',data);
  }
  getUserById (id :string) {
    return this.http.get('http://127.0.0.1:3002/user/user/'+id);
  }

  getUsers () {
    return this.http.get('http://127.0.0.1:3002/user/all');
  }
  getOnlyUser(){
    return this.http.get('http://127.0.0.1:3002/user/alluser');
  }
  
  getOnlyAdmin(){
    return this.http.get('http://127.0.0.1:3002/user/alladmin');
  }
  addAdmin(user: User) {

     return this.http.post('http://127.0.0.1:3002/user/add', user);
   
  }

  deleteAdmin(id){
    return this.http.post('http://127.0.0.1:3002/user/delete/'+id,id)
  }

  updateUrl(id,user :User) {
    return this.http.post('http://127.0.0.1:3002/user/update/'+id,user)
  }

  updateAdmin(id,user : User){
    return this.http.post('http://127.0.0.1:3002/user/update/'+id,user)
  }
}
