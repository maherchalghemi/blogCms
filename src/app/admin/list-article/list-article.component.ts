import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../shared/services/article.service';
import { UserService } from '../../shared/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Article } from '../../models/article';
import { CategoryService } from '../../shared/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit {
  articles = [];
  x = [];
  updateArticleForm: FormGroup;
  createCategoryForm: FormGroup;
  idArticle: String = '';
  pathImg: String = '';
  article: Article;
  showFormCat: Boolean = false;
  
  cats = [];
  idArticleToDelete: String = '';
  showsearch: Boolean = false;
  searchTable ="";
  isadmin : Boolean;
  p : number = 1;
  constructor(private articleService: ArticleService,
    private userService: UserService,
    private categoryService: CategoryService,
    private router: Router
  ) {
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
  }


  ngOnInit() {
    this.getArticles();
    this.getCategories();
  }
  getArticles() {

    this.articleService.getArticles().subscribe(res => {
      console.log(res.json());

      // this.userService.getUserById(res.json().author._id)
      this.x = res.json().author;
      console.log(this.x);
      this.articles = res.json();
    });
  }

  goToAdd() {
    this.router.navigate(['admin/addarticle']);
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

  updateArticleBtn(form) {

    this.articleService.updateArticle(this.idArticle, form.value).subscribe(res => {
      console.log(res.json());
      this.getArticles();

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

  files;
  handlefileChange(files, id) {
    console.log('proceeding image upload ')
    const formData: FormData = new FormData();
    formData.append('photo', files[0], files[0].name);
    this.articleService.uploadImg(formData).subscribe(res => {
      this.pathImg = res.json().path;
      this.article['url'] = this.pathImg;
      this.articleService.updateUrl(id, this.article).subscribe(res1 => {
        console.log(res1.json());
        this.getArticles();
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


  getArticleCurrent(id) {

    
    this.idArticleToDelete = id;
  }




}
