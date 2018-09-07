import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.component.html',
  styleUrls: ['./list-admin.component.css']
})
export class ListAdminComponent implements OnInit {
  users = [];
  idUser: String = '';
  updateAdminForm: FormGroup;
  showUploadImg: Boolean = false;
  pathImg: String = '';
  user: User;
  idUserToDelete;
  isadmin : Boolean;
  p : number = 1;
  showsearch: Boolean = false;
  searchTable ="";
  constructor(private userService: UserService ,
    private router: Router) {
    this.updateAdminForm = new FormGroup({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required)
    })
    this.isadmin = true;
    this.user = new User();
  }

  ngOnInit() {

    this.getUsers();
  }

  getOnlyUser() {
    this.userService.getOnlyUser().subscribe(res => {
      console.log(res.json());
      this.users = res.json();
    });
  }
  getOnlyAdmin(){
    this.userService.getOnlyAdmin().subscribe(res => {
      console.log(res.json());
      this.users = res.json();
    });  
  }


  getAdmin(id) {

    console.log('iam here');
    this.idUser = id;

    this.userService.getUserById(id).subscribe(res => {

      this.updateAdminForm.controls['name'].setValue(res.json().name);
      this.updateAdminForm.controls['lastname'].setValue(res.json().lastname);
      this.updateAdminForm.controls['email'].setValue(res.json().email);
      this.updateAdminForm.controls['password'].setValue(res.json().password);
    });
  }

  updateAdminBtn(form) {



    this.userService.updateAdmin(this.idUser, form.value).subscribe(res => {
      console.log(res.json());
      this.getUsers();

    });
  }

 
  showDivInputImh(id) {
    this.showUploadImg = true;
    this.idUser = id;
  }

  files;
  handlefileChange(files, id) {
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


delete(){
this.userService.deleteAdmin(this.idUserToDelete).subscribe(res => {
  console.log(res.json());
  this.ngOnInit();
});
}

goToAdd(){
  this.router.navigate(['admin/addAdmin']);
}


getAdminCurrent(id){
this.idUserToDelete=id;
}
  getUsers() {
    this.userService.getUsers().subscribe(res => {
      console.log(res.json());
      this.users = res.json();
    });
  }

}
