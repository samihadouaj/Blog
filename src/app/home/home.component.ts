import { UserModel } from './../user/user.model';
import { TokenManager } from './../tokenManager';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService,
    private tokenManager: TokenManager) { }
  currentUser: UserModel = {name: ' ',  email: ' ', password: ' ', image: '' };
username: string;
  async ngOnInit() {
    this.currentUser  = JSON.parse(localStorage.getItem('currentUser'));
    this.userService.currentUserSub.next(this.currentUser);
    if(this.currentUser) {
      this.username = this.currentUser.name ;
    }
    else this.username = 'dear guest';
  }

}
