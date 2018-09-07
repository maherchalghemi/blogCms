import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './admin/home/home.component';
import { BlogComponent } from './blog/blog.component';
import { HomeblogComponent } from './blog/homeblog/homeblog.component';
import { AddAdminComponent } from './admin/add-admin/add-admin.component';
import { FooterComponent } from './admin/footer/footer.component';
import { HeaderComponent } from './admin/header/header.component';
import { ListAdminComponent } from './admin/list-admin/list-admin.component';
import { ListArticleComponent } from './admin/list-article/list-article.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FileSelectDirective } from 'ng2-file-upload';
import { HeaderblogComponent } from './blog/headerblog/headerblog.component';
import { FooterblogComponent } from './blog/footerblog/footerblog.component';
import { AddarticleComponent } from './blog/addarticle/addarticle.component';
import { AddArticleComponent } from './admin/add-article/add-article.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListCategiriesComponent } from './admin/list-categiries/list-categiries.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { ProfileUserComponent } from './blog/profile-user/profile-user.component';
import { PostComponent } from './blog/post/post.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchPipePipe } from './shared/search-pipe.pipe';
import { MenuComponent } from './admin/menu/menu.component';



@NgModule({
  declarations: [
    FileSelectDirective,
    AppComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    HomeComponent,
    BlogComponent,
    HomeblogComponent,
    AddAdminComponent,
    FooterComponent,
    HeaderComponent,
    ListAdminComponent,
    ListArticleComponent,
    HeaderblogComponent,
    FooterblogComponent,
    AddarticleComponent,
    AddArticleComponent,
    ListCategiriesComponent,
    ProfileComponent,
    ProfileUserComponent,
    PostComponent,
    SearchPipePipe,
    MenuComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    EditorModule,
    NgbModule.forRoot(),
    NgxPaginationModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
