import { AuthService } from './../auth/auth.service';
import { UserModel } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenManager } from '../tokenManager';
import { Subject } from 'rxjs';

const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      };
@Injectable()

export  class UserService {
        currentUserSub = new Subject<UserModel>();
        constructor(private httpClient: HttpClient,
                 private authService: AuthService,
                private tokenManager: TokenManager) {}

        getUser(userId) {
            return this.httpClient.get<UserModel>('http://localhost:3000/api/users/' + userId).toPromise();
    }

    showTrash(commentId) {
           if (! this.authService.isConnected()) {return false; }
          const user = JSON.parse(localStorage.getItem('currentUser'));

            for (const c of user.comments) {
                    if (c == commentId) {
                            return true;
                    }
            }
            return false;
    }

        updateUser(newInfo, userId) {
                return this.httpClient.put('http://localhost:3000/api/users/' + userId, newInfo, httpOptions );

        }

         isItYourPost(postId) {
                if (! this.authService.isConnected()) {return false; }
          const user = JSON.parse(localStorage.getItem('currentUser'));
          for (const c of user.posts) {
                if (c == postId) {
                        return true;
                }
        }
        return false;
        }
    }



