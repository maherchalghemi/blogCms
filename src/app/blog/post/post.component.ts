import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../shared/services/article.service';
import { CommentService } from '../../shared/services/comment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Article } from '../../models/article';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css',
    "../../../assets/blog/vendor/bootstrap/css/bootstrap.min.css",
    "../../../assets/blog/vendor/bootstrap/css/bootstrap.min.css",
    "../../../assets/blog/css/fontastic.css",
    "../../../assets/blog/vendor/@fancyapps/fancybox/jquery.fancybox.min.css",
    "../../../assets/blog/css/style.blue.css",
    "../../../assets/blog/css/custom.css"]
})
export class PostComponent implements OnInit {
  idArticle: string = "";
  nameArticle: String = "";
  descriptionArticle: String = "";
  date: Date;
  urlArticle: String = "";
  urlUser: String = "";
  author: String = "";
  category: string = "";
  comments = [];
  lastPosts = [];
  postForm: FormGroup;
  comment: Comment;
  article: Article;
  isadmin : Boolean;
  constructor(private articleService: ArticleService,
    private commentService: CommentService,
    private router: ActivatedRoute) {
      this.isadmin = false;
    router.params.subscribe(params => {
      console.log(params);
      this.idArticle = params.id;

    });
    this.postForm = new FormGroup({
      text: new FormControl('', Validators.required)

    });

    this.comment = new Comment();
    this.article = new Article();


  }

  getComments() {
    // from article Service
    this.articleService.getArticleById(this.idArticle).subscribe(res => {
      console.log(res.json());
      this.comments = res.json().comment;
      this.author = res.json().author.name + ' ' + res.json().author.lastname;
      this.nameArticle = res.json().name;
      this.descriptionArticle = res.json().description;
      this.urlArticle = res.json().url;
      this.urlUser = res.json().author.url;
      this.date = res.json().date;
      this.category = res.json().category.type;




    })
  }

  getLastPost() {
    this.articleService.getLastPost().subscribe(res => {
      console.log(res.json());
      this.lastPosts = res.json();
    });
  }
  AddComment(form) {
    this.comment = form.value;
    this.comment['author'] = localStorage.getItem('id');
    this.comment['article'] = this.idArticle;
    this.commentService.addComment(this.comment).subscribe(res => {
      console.log(res.json()._id);
     
      this.articleService.updateComment(this.idArticle, res.json()._id).subscribe(res1 => {
        console.log(res1.json());
        this.ngOnInit();
        //  this.postForm.setValue({});
      });
    });

  }



  ngOnInit() {
    this.getComments();
    this.getLastPost();

  }

}
