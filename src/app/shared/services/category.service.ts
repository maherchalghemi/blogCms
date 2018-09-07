import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Category } from '../../models/category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : Http) { }

  getCategories () {
    return this.http.get('http://127.0.0.1:3002/category/all');
  }

  getCategoryById (id :string) {
    return this.http.get('http://127.0.0.1:3002/category/category/'+id);
  }

  addCategory (category : Category) {
    return this.http.post('http://127.0.0.1:3002/category/add', category);

  }


  deleteCategory(id){
    return this.http.post('http://127.0.0.1:3002/category/delete/'+id,id)
  }

 
  updateCategory(id,category : Category){
    return this.http.post('http://127.0.0.1:3002/category/update/'+id,category)
  }
}
