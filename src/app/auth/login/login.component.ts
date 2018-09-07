import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from "../../models/user";
import { AuthService } from "../../shared/services/auth.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  user : User;
  mesg : string ;
  show :Boolean = false ;
  constructor(private authService : AuthService , private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required)
    })
    
  }

  ngOnInit() {
  }


 
  loginBtn(form) {
    this.mesg='';
    console.log(form.valid)
    console.log(form);

    this.authService.login(form.value).subscribe(res => {
      // localStorage.setItem('token', res.json().userToken);

     
      

      console.log(res.json()) ;
      this.router.navigate(['admin']);
      


    },
    err => {
      console.log(err);
      if (err.status== 403){
        this.show = true ;
        this.mesg = "Utilisateur introuvale , veuillez vérifier votre email" ;
        console.log(this.mesg);
      }
      if (err.status== 402){
        this.show = true ;
        this.mesg = "Votre Mot de Passe est incorrect" ;
        console.log(this.mesg);
      }

    }
  
  );

   
  }

}
