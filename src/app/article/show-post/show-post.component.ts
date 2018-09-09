import { TokenManager } from './../../tokenManager';
import { ArticleService } from './../article.service';
import { PostModel } from './../posts.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from '../../user/user.model';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit {
post: PostModel = {title: ' ' , subject: ' ', content: ' ',  owner: {_id: ' ' , ownerName: ' '} , type: ' '};
owner: UserModel = {name: ' ',  email: ' ', password: ' ', image: '' };
postId: string;
comments: any;
  constructor(private articleService: ArticleService,
  private route: ActivatedRoute,
private userService: UserService
) { }

  async ngOnInit() {
     this.postId = this.route.snapshot.params['id'];
    this.post = await this.articleService.getPost(this.postId);
   this.owner = await this.userService.getUser(this.post.owner._id);
  }

}
