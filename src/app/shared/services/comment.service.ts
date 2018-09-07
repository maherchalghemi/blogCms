import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http : Http) { }

  getCategories () {
    return this.http.get('http://127.0.0.1:3002/comment/all');
  }

  getCommentById (id :string) {
    return this.http.get('http://127.0.0.1:3002/comment/comment/'+id);
  }

  addComment(comment : Comment) {
    return this.http.post('http://127.0.0.1:3002/comment/add', comment);

  }


  deleteComment(id){
    return this.http.post('http://127.0.0.1:3002/comment/delete/'+id,id)
  }

 
  updateComment(id,comment : Comment){
    return this.http.post('http://127.0.0.1:3002/comment/update/'+id,comment)
  }


}
