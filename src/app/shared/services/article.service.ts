import { Injectable } from '@angular/core';
import { Article } from '../../models/article';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http : Http) { }

  getArticles () {
    return this.http.get('http://127.0.0.1:3002/article/all');
  }

  getcategories (id : string) {
    return this.http.get('http://127.0.0.1:3002/article/category/'+id);
  }
  

  getArticleById (id :string) {
    return this.http.get('http://127.0.0.1:3002/article/article/'+id);
  }

  getLastPost () {
    return this.http.get('http://127.0.0.1:3002/article/lastart');
  }

  updateArticle(id,article : Article){
    return this.http.post('http://127.0.0.1:3002/article/update/'+id,article)
  }

  like (user , id : string) {

    return this.http.post('http://localhost:3002/article/like/'+id, {like : user});
  }
dislike(id,i) {
  return this.http.post('http://localhost:3002/article/dislike/'+id+'/'+i, {like : i});
}
  updateComment(id,commentid){
 
  return this.http.post('http://127.0.0.1:3002/article/updatecomment/'+id,{comment : commentid})
  }
  addArticle (article : Article) {
    return this.http.post('http://127.0.0.1:3002/article/add', article);

  }

  uploadImg(data){
    return this.http.post('http://127.0.0.1:3002/article/upload',data);
  }

  updateUrl(id,article : Article) {
    return this.http.post('http://127.0.0.1:3002/article/update/'+id,article)
  }

  deleteArticle(id){
    return this.http.post('http://127.0.0.1:3002/article/delete/'+id,id)
  }

}
