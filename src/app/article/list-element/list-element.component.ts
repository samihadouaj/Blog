import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { ArticleService } from './../article.service';
import {Component, Input, OnInit} from '@angular/core';
import { TokenManager } from '../../tokenManager';
import { UserService } from '../../user/user.service';
import { UserModel } from '../../user/user.model';

@Component({
  selector: 'app-list-element',
  templateUrl: './list-element.component.html',
  styleUrls: ['./list-element.component.css']
})
export class ListElementComponent implements OnInit {
@Input()p;
liked = false;
  constructor(private tokenManager: TokenManager,
     private articleService: ArticleService,
    private userService: UserService,
  private authService: AuthService,
private router: Router) { }

owner: UserModel = {name: ' ',  email: ' ', password: ' ', image: '' };
  async ngOnInit() {
    if (this.authService.isConnected()) {this.isItLiked(this.p._id); }
    this.owner = await this.userService.getUser(this.p.owner._id);
  }

  like(likedPostId: string) {
    if (this.authService.isConnected()) {
      this.articleService.like({actualUserId: this.tokenManager.getDecoded().id, likedPostId: likedPostId})
    .subscribe((res) => {
    this.p.likes += 1;
    this.liked = true;
    }); } else {
        this.router.navigate(['login']);
    }
  }

  dislike(likedPostId: string) {
    this.articleService.dislike({actualUserId: this.tokenManager.getDecoded().id, likedPostId: likedPostId})
    .subscribe((res) => {
    this.p.likes -= 1;
    this.liked = false;
    });
  }

  async isItLiked(postId) {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      for (const l of user.likedPosts) {
          if (l === postId ) {
             this.liked = true;
           }
      }
  }

}
