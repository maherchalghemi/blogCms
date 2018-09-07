import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'app-list-categiries',
  templateUrl: './list-categiries.component.html',
  styleUrls: ['./list-categiries.component.css']
})
export class ListCategiriesComponent implements OnInit {
  cats = [];
  searchTable = ""
  idcat: String = '';
  updateCategoryForm: FormGroup;
  CreateCategoryForm: FormGroup;
  idcatToDelete: String = '';
  showsearch  : Boolean = false;
  isadmin :Boolean;
  constructor(private categoryService : CategoryService) {
    this.isadmin = true; 
    this.updateCategoryForm = new FormGroup({
      type: new FormControl('', Validators.required)
    
    });

    this.CreateCategoryForm = new FormGroup({
      type: new FormControl('', Validators.required)
    
    });

  }

  ngOnInit() {
    this.getCats();
  }


  getCategory(id) {

    console.log('iam here');
    this.idcat = id;

    this.categoryService.getCategoryById(id).subscribe(res => {

      this.updateCategoryForm.controls['type'].setValue(res.json().type);
      
    });
  }


  updateCategoryBtn(form) {
    this.categoryService.updateCategory(this.idcat, form.value).subscribe(res => {
      console.log(res.json());
      this.ngOnInit();

    });
  }


delete(){
  this.categoryService.deleteCategory(this.idcatToDelete).subscribe(res => {
    console.log(res.json());
    this.ngOnInit();
  });
  }
  
  AddCategoryBtn(form) {
    console.log('clicked', form)
    this.categoryService.addCategory(form.value).subscribe(res => {
      console.log(res.json());
      this.ngOnInit();
      
    });
  }
  
  getCategoryCurrent(id){
  this.idcatToDelete=id;
  }

  getCats() {
    this.categoryService.getCategories().subscribe(res => {
      console.log(res.json());
      this.cats = res.json();
    });
  }

}
