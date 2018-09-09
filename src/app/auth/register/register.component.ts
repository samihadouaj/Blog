import { AuthService } from './../auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../user/user.service';
import { TokenManager } from '../../tokenManager';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
checkboxValue: boolean;
showError = false;
errorMessage ;
  constructor(private authService: AuthService, private userService: UserService,
    private tokenManager: TokenManager, private router: Router) { }
  ngOnInit() {
  }
  register(value) {
    console.log(value);
    if(!value['image']) {value['image'] = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5NhKTvEHqrbJaLzsiKAla9CG9RRni47huN3DPPcenQsPkGL-Y0A'} ;
      this.authService.register(value).subscribe(async (res: {token: string}) => {
        if(!res.token) {
        this.errorMessage = res;
        this.showError = true;
        }
        if (res.token) {
          localStorage.setItem('token', res.token);
          const user = await this.userService.getUser(this.tokenManager.getDecoded().id);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['/home']);
        }
    });

  }

}
