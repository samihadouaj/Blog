import { CanActivate } from '@angular/router';
import { TokenManager } from './tokenManager';
import { ArticleService } from './article/article.service';
import { AuthService } from './auth/auth.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CreateArticleComponent } from './article/create-article/create-article.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { ShowPostComponent } from './article/show-post/show-post.component';
import { PostsListComponent } from './article/posts-list/posts-list.component';
import { ListElementComponent } from './article/list-element/list-element.component';
import { UserService } from './user/user.service';
import { CommentService } from './article/comment.service';
import { CommentShowComponent } from './article/comment-show/comment-show.component';
import { CommentListComponent } from './article/comment-list/comment-list.component';
import { UserComponent } from './user/user/user.component';
import { SettingsComponent } from './user/settings/settings.component';
import { AuthGuardService } from './auth-guard.service';
import { UpdatepostComponent } from './article/updatepost/updatepost.component';
import { AboutComponent } from './about/about.component';


const routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home' , component: HomeComponent},
  {path: 'about' , component: AboutComponent},
  {path: 'article/:id' , component: ShowPostComponent},
  {path: 'writeArticle' , component: CreateArticleComponent,canActivate:[AuthGuardService]},
  {path: 'me' , component: UserComponent ,canActivate:[AuthGuardService]},
  {path: 'settings' , component: SettingsComponent ,canActivate:[AuthGuardService]},
  {path: 'updatePost/:postId' , component: UpdatepostComponent ,canActivate:[AuthGuardService]},
  {path: '' , redirectTo: 'home' , pathMatch: 'full'},

 ];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    CreateArticleComponent,
    ShowPostComponent,
    PostsListComponent,
    ListElementComponent,
    CommentShowComponent,
    CommentListComponent,
    UserComponent,
    SettingsComponent,
    UpdatepostComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule
  ],
  providers: [AuthService, ArticleService, TokenManager, UserService, CommentService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
