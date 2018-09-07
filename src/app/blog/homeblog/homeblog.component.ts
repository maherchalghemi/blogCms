import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../shared/services/article.service';
import { Article } from '../../models/article';
import { Like } from '../../models/like';
import { SearchPipePipe } from "../../shared/search-pipe.pipe";
import { CategoryService } from '../../shared/services/category.service';


@Component({
  selector: 'app-homeblog',
  templateUrl: './homeblog.component.html',
  styleUrls: ['./homeblog.component.css',
    "../../../assets/blog/vendor/bootstrap/css/bootstrap.min.css",
    "../../../assets/blog/vendor/bootstrap/css/bootstrap.min.css",
    "../../../assets/blog/css/fontastic.css",
    "../../../assets/blog/vendor/@fancyapps/fancybox/jquery.fancybox.min.css",
    "../../../assets/blog/css/style.blue.css",
    "../../../assets/blog/css/custom.css"]
})
export class HomeblogComponent implements OnInit {
  isClassVisible: Boolean = false;
  articles = [];
  cats = {};
  articlescat = [];
  likes = [];
  lastPosts = [];
  article: Article;
  liked: Like;
  searchBlog = "";
  isadmin: Boolean;
  categories = [];
  objectKeys = Object.keys;

  p: number = 1;
  nbart: number = 0;
  constructor(private articleService: ArticleService, private categoryService: CategoryService) {
    this.isadmin = false;
    this.article = new Article();
    this.liked = new Like();
  }

  ngOnInit() {
    this.getArticles();
    this.getLastPost();
    this.isClassVisible;
    this.getCategories();
  }

  getCategories() {
    this.articleService.getArticles().subscribe(res => {
      console.log(res.json());
      this.articles = res.json();
      this.articles.forEach(art => {
        console.log(art);
        if (art.category) {
          if (!this.cats[art.category.type]) {
            this.cats[art.category.type] = 1;
          } else {
            this.cats[art.category.type] += 1;
          }
        }
      });
      console.log(this.cats);
    });

  }

  getLastPost() {
    this.articleService.getLastPost().subscribe(res => {
      console.log(res.json());
      this.lastPosts = res.json();
    });
  }
  like(id) {
    console.log(id);

    this.articleService.like(localStorage.getItem('id'), id).subscribe(res => {
      console.log(res.json());
      this.getArticles();

    });
    console.log('kkkkk');


  }
  dislike(id) {
    this.articleService.dislike(id, localStorage.getItem('id')).subscribe(res => {
      console.log(res.json());
      this.getArticles();

    });
  }


  getArticles() {
    this.articleService.getArticles().subscribe(res => {
      console.log(res.json());
      this.articles = res.json();


      this.likes = this.articles['like'];


      for (let i = 0; i < this.articles.length; i++) {

        for (let j = 0; j < this.articles[i].like.length; j++) {
          const element = this.articles[i]['like'][j];
          console.log("jjj", element);
          if (element == localStorage.getItem('id')) {
            this.articles[i]['liked'] = true;
            console.log("good");
          }

        }


      }


      console.log('hhhh', this.articles);
    });
  }

}
