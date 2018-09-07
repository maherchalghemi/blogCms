import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './admin/home/home.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminComponent } from './admin/admin.component';
import { HomeblogComponent } from './blog/homeblog/homeblog.component';
import { AddAdminComponent } from './admin/add-admin/add-admin.component';
import { ListAdminComponent } from './admin/list-admin/list-admin.component';
import { ListArticleComponent } from './admin/list-article/list-article.component';
import { AddarticleComponent } from './blog/addarticle/addarticle.component';
import { AddArticleComponent } from './admin/add-article/add-article.component';
import { ListCategiriesComponent } from './admin/list-categiries/list-categiries.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { ProfileUserComponent } from './blog/profile-user/profile-user.component';
import { PostComponent } from './blog/post/post.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';


const routes: Routes = [

  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },

  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }

    ]

  },


  {
    path: 'blog',
    component: BlogComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'homeblog'
      },
      {
        path: 'homeblog',
        component: HomeblogComponent
      },
      {
        path: 'addarticle',
        component: AddarticleComponent
      },
      {
        path: 'profile',
        component: ProfileUserComponent
      },
      {
        path: 'post/:id',
        component: PostComponent
      }

    ]
  },



  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard ,RoleGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },

      {
        path: 'home',
        component: HomeComponent
      },

      {
        path: 'addAdmin',
        component: AddAdminComponent
      },
      {
        path: 'addarticle',
        component: AddArticleComponent
      },
      {
        path: 'listAdmin',
        component: ListAdminComponent
      },
      {
        path: 'listArticle',
        component: ListArticleComponent
      },
      {
        path: 'listCategory',
        component: ListCategiriesComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
