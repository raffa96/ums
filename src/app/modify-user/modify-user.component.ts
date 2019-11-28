import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent implements OnInit {
  userCopy: IUser;

  modifiedUser: IUser;

  @Input() set user(user: IUser) {
    this.modifiedUser = user;

    this.userCopy = Object.assign({}, user);
  }

  get user() {
    return this.modifiedUser;
  }

  constructor(
    private service: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(param => {
      if (!param.get('id')) {
        return;
      }

      this.service.getUserById(+param.get('id')).subscribe(
        response => this.user = response.data
      );
    });
  }

  resetForm() {
    this.user = this.userCopy;
  }

  modifyUser() {
    this.service.modifyUser(this.user).subscribe(
      response => {
        const user = response.data;

        if (response.success) {
          console.log('Utente ' + user.name + ' modificato correttamente!');
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
