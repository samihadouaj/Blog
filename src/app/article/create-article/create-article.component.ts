import { TokenManager } from './../../tokenManager';
import { ArticleService } from './../article.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { validateConfig } from '@angular/router/src/config';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {
published = false;
@ViewChild('f') createArticleForm: NgForm;
  constructor(private articleService: ArticleService, private tokenManager: TokenManager) { }

  ngOnInit() {
  }
save(value) {
  const decoded = this.tokenManager.getDecoded();
  value['ownerName'] = decoded.name;
  this.articleService.createPost(value).subscribe((res) => {
      this.createArticleForm.reset();
    this.published = true;
  });
}
}
