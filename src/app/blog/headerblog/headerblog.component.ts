import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headerblog',
  templateUrl: './headerblog.component.html',
  styleUrls: ['./headerblog.component.css',
  "../../../assets/blog/vendor/bootstrap/css/bootstrap.min.css" , 
  "../../../assets/blog/vendor/bootstrap/css/bootstrap.min.css" ,
  "../../../assets/blog/css/fontastic.css",
  "../../../assets/blog/vendor/@fancyapps/fancybox/jquery.fancybox.min.css",
  "../../../assets/blog/css/style.default.css",
  "../../../assets/blog/css/custom.css"]
})
export class HeaderblogComponent implements OnInit {
myphoto : string;
  constructor(private userService : UserService , private router : Router) { }

  ngOnInit() {
    
this.userService.getUserById(localStorage.getItem('id')).subscribe(res => {
  console.log(res.json());
  this.myphoto = res.json().url;
});
  }

  logout() {
    localStorage.setItem('token','');
    localStorage.setItem('id','');
    this.router.navigate(['auth']);
  }

}
