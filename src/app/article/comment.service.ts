import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const httpOptions = {
    headers: new HttpHeaders({'x-auth-token': localStorage.getItem('token')})
  };
@Injectable()

export class CommentService  {
    comments: any[];
constructor(private httpClient: HttpClient) {}
    getComments(postId) {
        return this.httpClient.get<any[]>('http://localhost:3000/api/comments/' + postId).toPromise();
    }

    addComment(comment) {
        return this.httpClient.post('http://localhost:3000/api/comments', comment, httpOptions);
    }

    deleteComment(commentId) {
        return this.httpClient.delete('http://localhost:3000/api/comments/' + commentId , httpOptions);
    }
}
