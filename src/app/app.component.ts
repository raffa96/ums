import { User } from './classes/user.class';
import { IUser } from './interfaces/user.interface';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  updateUser: boolean;

  selectedUser: IUser = new User();

  modifyUser(user: IUser) {
    this.updateUser = true;

    this.selectedUser = user;
  }
}
