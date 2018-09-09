import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../article.service';
import {TokenManager} from '../../tokenManager';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
posts: any[] ;
liked = false;
  constructor(private articleService: ArticleService, private tokenManager: TokenManager) { }

  ngOnInit() {
      this.articleService.getPosts().subscribe((res: any []) => {
        this.posts = res;
      });
  }
  like(likedPostId: string) {
    this.articleService.like({actualUserId: this.tokenManager.getDecoded().id, likedPostId: likedPostId})
    .subscribe((res) => {console.log(res);
    const index = this.findPost(likedPostId);
    this.posts[index].likes += 1;
    this.liked = true;
    });
  }


  private findPost(id) {
    const p = this.posts.findIndex((el) => {
      return el._id === id;
    });
    return p;
  }

}
