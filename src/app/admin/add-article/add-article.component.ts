import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticleService } from '../../shared/services/article.service';
import { Article } from '../../models/article';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  createForm: FormGroup;
  createCategoryForm: FormGroup;
  showFormAdd: Boolean = true;
  showUploadImg: Boolean = false;
  idArticle: String = '';
  pathImg: String = '';
  article: Article;
  showFormCat : Boolean = false;
  cats = [];
  isadmin : Boolean;
  @ViewChild('content') content: any;
  constructor(private articleService: ArticleService, private modalService: NgbModal,
    private categoryService: CategoryService) {
    this.createForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
    })

    this.createCategoryForm = new FormGroup({
      type: new FormControl('', Validators.required)

    })
    this.isadmin = true;
    this.article = new Article();
  }

  ngOnInit() {
    this.getCategories();
  }
  test() {
    console.log('clicked')
    this.showFormCat = true;
  }

  changeSelect(cat) {
    console.log(cat);
    if (cat === 'Create New') {
      this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' })
    }
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
