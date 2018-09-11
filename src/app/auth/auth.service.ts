import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Router } from '@angular/router';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

@Injectable()

export class AuthService {
token: string;
    constructor(private httpCleint: HttpClient, private router: Router) {}
        login(user) {
           return this.httpCleint.post('http://localhost:3000/api/auth', user, httpOptions);
        }

        register(credentials) {
            return this.httpCleint.post('http://localhost:3000/api/users', credentials, httpOptions);
        }
        isConnected() {
            return localStorage.getItem('token');
        }

        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('currentUser');
            this.router.navigate(['home'])
            location.reload();
        }
 }
