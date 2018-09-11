import { TokenManager } from './../../tokenManager';
import { ArticleService } from './../article.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { validateConfig } from '@angular/router/src/config';
import { NgForm } from '@angular/forms';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {
published = false;
@ViewChild('f') createArticleForm: NgForm;
  constructor(private articleService: ArticleService, 
    private tokenManager: TokenManager,
    private userService: UserService) { }

  ngOnInit() {
  }
 save(value) {
  const decoded = this.tokenManager.getDecoded();
  value['ownerName'] = decoded.name;
  this.articleService.createPost(value).subscribe(async (res) => {
      this.createArticleForm.reset();
      const user = await this.userService.getUser(this.tokenManager.getDecoded().id);
      localStorage.setItem('currentUser', JSON.stringify(user));
      // we need to update our localy stored user when we add a post
    this.published = true;
  });
}
}
