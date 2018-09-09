import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { UserService } from '../../user/user.service';
import { TokenManager } from '../../tokenManager';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
     private router: Router,
     private userService: UserService,
     private tokenManager: TokenManager) { }

  ngOnInit() {
  }
     login(value) {
      this.authService.login(value).subscribe(async (res: {token: string}) => {
        localStorage.setItem('token', res.token);
         const user = await this.userService.getUser(this.tokenManager.getDecoded().id);
         localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/home']);
        });
    }
}
