import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
myname = "";
myphoto ="";
  constructor(private userService : UserService , private router : Router) {
    this.userService.getUserById(localStorage.getItem('id')).subscribe(res => {
      console.log(res.json());
      this.myname = res.json().name;
      this.myphoto =res.json().url;
    });
   }

   logout() {
    localStorage.setItem('token','');
    localStorage.setItem('id','');
    this.router.navigate(['auth']);
  }

  ngOnInit() {
  }

}
