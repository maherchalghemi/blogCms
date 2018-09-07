import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { ArticleService } from '../../shared/services/article.service';
import { Article } from '../../models/article';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'app-addarticle',
  templateUrl: './addarticle.component.html',
  styleUrls: ['./addarticle.component.css',
  "../../../assets/blog/vendor/bootstrap/css/bootstrap.min.css" , 
  "../../../assets/blog/vendor/bootstrap/css/bootstrap.min.css" ,
  "../../../assets/blog/css/fontastic.css",
  "../../../assets/blog/vendor/@fancyapps/fancybox/jquery.fancybox.min.css",
  "../../../assets/blog/css/style.blue.css",
  "../../../assets/blog/css/custom.css"]
})
export class AddarticleComponent implements OnInit {
  createForm: FormGroup;
  createCategoryForm: FormGroup;
  showFormAdd: Boolean = true;
  showUploadImg: Boolean = false;
  idArticle: String = '';
  pathImg: String = '';
  article : Article ;
  isadmin : Boolean;
  showFormCat : Boolean = false;
  cats = [];
  constructor(private articleService : ArticleService ,
    private categoryService: CategoryService) { 
    this.isadmin = false;
    this.createForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
  
    });
    this.createCategoryForm = new FormGroup({
      type: new FormControl('', Validators.required)

    });

    this.article = new Article();
  }

  ngOnInit() {
    this.getCategories();
  }
  AddCategory(form) {
    console.log('clicked', form)
    this.categoryService.addCategory(form.value).subscribe(res => {
      console.log(res.json());
      
    });
  }
  getCategories() { 
    this.categoryService.getCategories().subscribe(res => {
      console.log(res.json());
      this.cats = res.json();
    });
  }
  AddArticle(form) {

    const obj = form.value;
    obj['date'] = Date.now();
    obj['author'] = localStorage.getItem('id');




    this.articleService.addArticle(obj).subscribe(res => {
      console.log(res.json()._id);
      this.idArticle = res.json()._id;

    });

    this.showFormAdd = false;
    this.showUploadImg = true;

  }


  files;
  handlefileChange(files) {
    console.log('proceeding image upload ')
    const formData: FormData = new FormData();
    formData.append('photo', files[0], files[0].name);
    this.articleService.uploadImg(formData).subscribe(res => {
      console.log(res.json());
      
      this.pathImg = res.json().path;
      this.article['url'] = this.pathImg;
      // console.log(this.idArticle);
      // console.log(this.article);

      this.articleService.updateUrl(this.idArticle, this.article).subscribe(res1 => console.log(res1.json()));
    });


  }

}
