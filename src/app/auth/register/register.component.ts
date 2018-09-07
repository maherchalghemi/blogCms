import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  createForm: FormGroup;
  showFormAdd: Boolean = true;
  showUploadImg: Boolean = false;
  idUser: String = '';
  pathImg: String = '';
  user: User;

  // private authService: AuthService,

  constructor(private userService: UserService, private router: Router , private authService : AuthService) {
    this.createForm = new FormGroup({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required)
    })
    
    this.user = new User();
  }



  ngOnInit() {
 
  }
  AddBtn(form) {
    console.log(form.valid)
    console.log(form);

    const obj = form.value;
    obj['role'] = 'user'




    this.authService.register(obj).subscribe(res => {
      console.log(res.json()._id);
      this.idUser = res.json()._id;
      this.router.navigate(['blog']);
    });
   
    // this.showFormAdd = false;
    // this.showUploadImg = false;

  }

  

  files;
  handlefileChange(files) {
    console.log('proceeding image upload ')
    const formData: FormData = new FormData();
    formData.append('photo', files[0], files[0].name);
    this.userService.uploadImg(formData).subscribe(res => {
      this.pathImg = res.json().path;
      this.user['url'] = this.pathImg;
      this.userService.updateUrl(this.idUser, this.user).subscribe(res1 => console.log(res1.json()));
    });
    this.router.navigate(['blog']);

  }

}
