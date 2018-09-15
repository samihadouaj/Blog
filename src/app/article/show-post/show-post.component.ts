import { TokenManager } from './../../tokenManager';
import { ArticleService } from './../article.service';
import { PostModel } from './../posts.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
private userService: UserService,
private router: Router
) { }

  async ngOnInit() {
     this.postId = this.route.snapshot.params['id'];
    this.post = await this.articleService.getPost(this.postId);
    console.log(this.post);
   this.owner = await this.userService.getUser(this.post.owner._id);
  }

  detetePost(){
      this.articleService.delete(this.post._id).subscribe((res) => {
        console.log(res);
        confirm('post succefully deleted');
        this.router.navigate(['/home'])
      })

  }

  toUpdatePost() {
    this.router.navigate(['updatePost/', this.postId]);
  }
}
