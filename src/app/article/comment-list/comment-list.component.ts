import { TokenManager } from '../../tokenManager';
import { CommentService} from '../comment.service';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
comments: any[];
emptyArea ;
@Input() postId: string;
  constructor(private commentService: CommentService,
     private tokenManager: TokenManager, 
    private authService: AuthService,
    private userService: UserService) { }

  async ngOnInit() {
    this.commentService.comments = await this.commentService.getComments(this.postId);
  }

  async comment(value) {
    console.log(this.tokenManager.getDecoded());
    const comment = {writerId: this.tokenManager.getDecoded().id, postId: this.postId, content: value.content, date: Date()};
    console.log(comment);
  this.commentService.addComment(comment).subscribe(async (res) => {
    this.commentService.comments.push(res);
    this.emptyArea = ' ';
    const user = await this.userService.getUser(this.tokenManager.getDecoded().id);
      localStorage.setItem('currentUser', JSON.stringify(user));
   } );
}
}
