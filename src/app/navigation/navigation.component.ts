import { TokenManager } from './../tokenManager';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user/user.service';
import { UserModel } from '../user/user.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public authService: AuthService, private userService: UserService) { }
currentUser: UserModel = {name: " ",  email: " ", password: " ", image: "" };
   ngOnInit() {
     this.userService.currentUserSub.subscribe((u) =>  {this.currentUser = u
     console.log(this.currentUser);
    });
  }

}
