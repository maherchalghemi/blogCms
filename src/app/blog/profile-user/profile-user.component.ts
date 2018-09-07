import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../models/user';
import { Article } from '../../models/article';
import { ArticleService } from '../../shared/services/article.service';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css',
  "../../../assets/blog/vendor/bootstrap/css/bootstrap.min.css" , 
  "../../../assets/blog/vendor/bootstrap/css/bootstrap.min.css" ,
  "../../../assets/blog/css/fontastic.css",
  "../../../assets/blog/vendor/@fancyapps/fancybox/jquery.fancybox.min.css",
  "../../../assets/blog/css/style.blue.css",
  "../../../assets/blog/css/custom.css"]
})
export class ProfileUserComponent implements OnInit {

  
  myname: string = '';
  mylastName: string = '';
  myemail: string = '';
  mypwd: string = '';
  myurl : string = '';
  updateProfileForm: FormGroup;
  pathImg: String = '';
  user: User;
  article : Article;
  articles = [];
  cats = [];
  updateArticleForm: FormGroup;
  createCategoryForm : FormGroup;
  idArticleToDelete = "";
  idArticle = "";
  showFormCat: Boolean = false;
isadmin : Boolean;
p: number = 1;
  constructor(private userService: UserService ,
     private articleService : ArticleService ,
    private categoryService : CategoryService) {
    this.isadmin = false;
    this.updateProfileForm = new FormGroup({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required)
    });

    this.updateArticleForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
    })
    this.isadmin = true;

    this.createCategoryForm = new FormGroup({
      type: new FormControl('', Validators.required)

    })

    this.article = new Article();
    this.user = new User();
  }


  updateArticleBtn(form) {

    this.articleService.updateArticle(this.idArticle, form.value).subscribe(res => {
      console.log(res.json());
      this.ngOnInit();
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(res => {
      console.log(res.json());
      this.cats = res.json();
    });
  }

  AddCategory(form) {
    console.log('clicked', form)
    this.categoryService.addCategory(form.value).subscribe(res => {
      console.log(res.json());
      this.getCategories();

    });
  }

  filesArt;
  handlefileArtChange(filesArt, id) {
    console.log('proceeding image upload ')
    const formData: FormData = new FormData();
    formData.append('photo', filesArt[0], filesArt[0].name);
    this.articleService.uploadImg(formData).subscribe(res => {
      this.pathImg = res.json().path;
      this.article['url'] = this.pathImg;
      this.articleService.updateUrl(id, this.article).subscribe(res1 => {
        console.log(res1.json());
        this.ngOnInit();
      });
    });
  }


  delete() {
    console.log('this id',this.idArticleToDelete);
    this.articleService.deleteArticle(this.idArticleToDelete).subscribe(res => {
      console.log(res.json());
      this.ngOnInit();
      this.idArticleToDelete = '';
    });
    
  }

  getArticle(id) {

    console.log('iam here');


    this.idArticle = id;

    this.articleService.getArticleById(id).subscribe(res => {
      console.log(res.json());
      this.updateArticleForm.controls['name'].setValue(res.json().name);
      this.updateArticleForm.controls['description'].setValue(res.json().description);
      this.updateArticleForm.controls['category'].setValue(res.json().category);

    });
  }

  getArticleCurrent(id) {

    
    this.idArticleToDelete = id;
  }









  updateMyProfileBtn(form) {
    console.log('sqdqsd');
    var id = localStorage.getItem('id');
    this.userService.updateAdmin(id, form.value).subscribe(res => {
      console.log(res.json());
      this.getMyProfile();
      
    });

  }
getMyArticle(){
  var id = localStorage.getItem('id');
  this.userService.getUserById(id).subscribe(res => {

    console.log(res.json());
    this.articles = res.json().articles;
    console.log('jjj',this.articles);
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
    this.getMyArticle();
    this.getCategories();
  }

}
