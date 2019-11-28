import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';
import { IUser } from '../interfaces/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: IUser[];

  @Output() modify = new EventEmitter();

  constructor(private service: UserService) { }

  ngOnInit() {
    this.service.getUsers().subscribe(
      response => this.users = response.data
    );
  }

  modifyUser(user: IUser) {
    const userCopy = Object.assign({}, user);

    this.modify.emit(userCopy);
  }

  deleteUser(user: IUser) {
    const confirmDelete = confirm('Sei sicuro di voler eliminare questo utente?');

    if (confirmDelete) {
      this.service.deleteUser(user).subscribe(
        response => {
          if (response.success) {
            const index = this.users.indexOf(user);

            this.users.splice(index, 1);

            console.log('Utente eliminato con successo!');
          } else {
            console.log(response.message);
          }
        }
      );
    }
  }
}
