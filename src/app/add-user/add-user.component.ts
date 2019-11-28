import { Router } from '@angular/router';
import { User } from './../classes/user.class';
import { UserService } from './../services/user.service';
import { IUser } from './../interfaces/user.interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Input() user: IUser;

  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
    this.user = new User();
  }

  resetForm() {
    this.user = new User();
  }

  createUser() {
    this.service.createUser(this.user).subscribe(
      response => {
        const user = response.data;

        if (response.success) {
          console.log('Utente ' + user.name + ' aggiunto correttamente!');
        } else {
          console.log(response.message);
        }

        this.router.navigate(['']);
      }
    );
  }

  backToHome() {
    this.router.navigate(['']);
  }
}
