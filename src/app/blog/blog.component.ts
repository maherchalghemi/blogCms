import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css' , 
  "../../assets/blog/vendor/bootstrap/css/bootstrap.min.css" , 
  "../../assets/blog/vendor/bootstrap/css/bootstrap.min.css" ,
  "../../assets/blog/css/fontastic.css",
  "../../assets/blog/vendor/@fancyapps/fancybox/jquery.fancybox.min.css",
  "../../assets/blog/css/style.blue.css",
  "../../assets/blog/css/custom.css",
  
]
})
export class BlogComponent implements OnInit {
isadmin : Boolean
  constructor() { this.isadmin = false;}

  ngOnInit() {

  }

}
