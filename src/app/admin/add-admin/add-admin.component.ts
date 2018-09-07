import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

// const URL = 'http://127.0.0.1:3002/user/upload';
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  createForm: FormGroup;
  showFormAdd: Boolean = true;
  showUploadImg: Boolean = false;
  idUser: String = '';
  pathImg: String = '';
  user: User;
isadmin : Boolean;
  // private authService: AuthService,

  constructor(private userService: UserService, private router: Router) {
    this.createForm = new FormGroup({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required)
    })
    this.isadmin = true;
    this.user = new User();
  }



  ngOnInit() {
 
  }
  AddBtn(form) {
    console.log(form.valid)
    console.log(form);

    const obj = form.value;
    obj['role'] = 'admin'




    this.userService.addAdmin(obj).subscribe(res => {
      console.log(res.json()._id);
      this.idUser = res.json()._id;

    });

    this.showFormAdd = false;
    this.showUploadImg = true;

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


  }

}
