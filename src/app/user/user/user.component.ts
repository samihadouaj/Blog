import { UserModel } from './../user.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { TokenManager } from '../../tokenManager';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: UserModel = { name: ' ', email: ' ', password: ' ', image: '' };

  constructor(private router: Router) { }

  async ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  toSettings() {
    this.router.navigate(['settings']);
  }

}
