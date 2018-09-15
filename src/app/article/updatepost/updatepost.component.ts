import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PostModel } from '../posts.model';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-updatepost',
  templateUrl: './updatepost.component.html',
  styleUrls: ['./updatepost.component.css']
})
export class UpdatepostComponent implements OnInit {

  post: PostModel = {title: ' ' , subject: ' ', content: ' ',  owner: {_id: ' ' , ownerName: ' '} , type: ' '};
  @ViewChild('f') setting: NgForm;
  updated = false;
  constructor(private articleService: ArticleService,
    private route: ActivatedRoute) { }
    postId: string
  async ngOnInit() {
     this.postId = this.route.snapshot.params['postId'];
    this.post =  await this.articleService.getPost(this.postId);
    console.log(this.postId);
   console.log(this.post);
      this.setting.form.patchValue({
            title: this.post.title,
            subject: this.post.subject,
            type: this.post.type,
            content: this.post.content
      });
  }

  applyChanges(value) {
  this.articleService.updatePost(value, this.postId).subscribe((res) => {
  console.log(res);
  this.updated = true
});
  }

}
