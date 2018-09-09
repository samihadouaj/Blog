import { UserModel } from './../user.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenManager } from '../../tokenManager';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: UserModel = {name: ' ',  email: ' ', password: ' ', image: '' };
  @ViewChild('f') setting: NgForm;
  constructor(private userService: UserService,
    private tokenManager: TokenManager) { }
  async ngOnInit() {
   this.user = await JSON.parse(localStorage.getItem('currentUser'));
   console.log(this.user);
      this.setting.form.patchValue({
            name: this.user.name,
            email: this.user.email,
            password: '',
            image: this.user.image
      });
  }

  saveChanges(value) {
  this.userService.updateUser(value, this.tokenManager.getDecoded().id).subscribe((res) => {
  console.log(res);
});
  }

}