import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../user/user.service';
import { CommentService } from '../comment.service';
import { UserModel } from '../../user/user.model';

@Component({
  selector: 'app-comment-show',
  templateUrl: './comment-show.component.html',
  styleUrls: ['./comment-show.component.css']
})
export class CommentShowComponent implements OnInit {
@Input() comment;
username: string;
showTrash = false;
writer: UserModel = {name: ' ',  email: ' ', password: ' ', image: '' };

  constructor(private userService: UserService, private commentService: CommentService) { }

  async ngOnInit() {
this.showTrash =   this.userService.showTrash(this.comment._id);
this.writer = await this.userService.getUser(this.comment.writerId);
this.username = this.writer.name;
  }

  deleteEl(tab, id) {
    for (const c of tab) {
      if (c._id == id) {
          const index = tab.indexOf(c);
          tab.splice(index, 1);
      }
    }
  }

  delete() {
      this.commentService.deleteComment(this.comment._id).subscribe((res) => {
        console.log('comment Deleted');
          this.deleteEl(this.commentService.comments, this.comment._id);
      });
  }

}
