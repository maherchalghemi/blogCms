import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  myname: string = '';
  mylastName: string = '';
  myemail: string = '';
  mypwd: string = '';
  myurl: string = '';
  updateProfileForm: FormGroup;
  pathImg: String = '';
  user: User;
isadmin : Boolean;
  constructor(private userService: UserService) {
    this.isadmin = true;
    this.updateProfileForm = new FormGroup({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required)
    })

    this.user = new User();
  }



  updateMyProfileBtn(form) {
    console.log('sqdqsd');
    var id = localStorage.getItem('id');
    this.userService.updateAdmin(id, form.value).subscribe(res => {
      console.log(res.json());
      this.getMyProfile();
      
    });

  }

  getMyProfile() {
    var id = localStorage.getItem('id');
    this.userService.getUserById(id).subscribe(res => {

      console.log(res.json());
      this.myname = res.json().name;
      this.mylastName = res.json().lastname;
      this.myemail = res.json().email;
      this.mypwd = res.json().password;
      this.myurl = res.json().url;
      // this.updateProfileForm.setValue(res.json());
      this.updateProfileForm.controls['name'].setValue(res.json().name);
      this.updateProfileForm.controls['lastname'].setValue(res.json().lastname);
      this.updateProfileForm.controls['email'].setValue(res.json().email);
      this.updateProfileForm.controls['password'].setValue(res.json().password);
    });

  }

  files;
  handlefileChange(files) {
    var id = localStorage.getItem('id');
    console.log('proceeding image upload ')
    const formData: FormData = new FormData();
    formData.append('photo', files[0], files[0].name);
    this.userService.uploadImg(formData).subscribe(res => {
      this.pathImg = res.json().path;
      this.user['url'] = this.pathImg;
      this.userService.updateUrl(id, this.user).subscribe(res1 => {
        console.log(res1.json());
        this.ngOnInit();
      });
    });
}
  ngOnInit() {
    this.getMyProfile();
  }
}
