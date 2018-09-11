import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostModel } from './posts.model';
const httpOptions = {
    headers: new HttpHeaders({'x-auth-token': localStorage.getItem('token')})
  };
  @Injectable()
export class ArticleService {
    constructor(private httpClient: HttpClient) { }
    createPost(post) {
        return this.httpClient.post('http://localhost:3000/api/posts', post, httpOptions);
    }

    getPosts() {
        return this.httpClient.get('http://localhost:3000/api/posts');
    }

    getPost(postId) {
        return this.httpClient.get<PostModel>('http://localhost:3000/api/posts/' + postId ).toPromise();
    }

    like(ids) {
        return this.httpClient.put('http://localhost:3000/api/users/like', ids, httpOptions);
    }

    dislike(ids) {
        return this.httpClient.put('http://localhost:3000/api/users/dislike', ids, httpOptions);
    }
    delete(postId) {
        return this.httpClient.delete('http://localhost:3000/api/posts/' + postId, httpOptions);
    }
    updatePost(newPost, postId) {
        return this.httpClient.put('http://localhost:3000/api/posts/' + postId, newPost, httpOptions);

    }
    }
