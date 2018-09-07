import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { ArticleService } from '../../shared/services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nbAllUser : number;
  nbUser : number;
  nbAdmin : number;
  nbArticle : number;
 
  
  constructor(private userService : UserService ,private articleService : ArticleService ) { }

  ngOnInit() {
   this.getArticles()
   this.getOnlyAdmin()
   this.getOnlyUser()
   this.getUsers()
  }

  getOnlyUser() {
    this.userService.getOnlyUser().subscribe(res => {
    
      
      this.nbUser = res.json().length
      console.log(this.nbUser)
    });
  }
  getOnlyAdmin(){
    this.userService.getOnlyAdmin().subscribe(res => {
     
     
      this.nbAdmin = res.json().length
      console.log(this.nbAdmin)
    });  
  }
  
  getUsers() {
    this.userService.getUsers().subscribe(res => {
     
      this.nbAllUser = res.json().length
      console.log(this.nbAllUser)
    });
  }
  
    getArticles() {

    this.articleService.getArticles().subscribe(res => {
      
      this.nbArticle= res.json().length;
      console.log(this.nbArticle)

    });
  }


}
