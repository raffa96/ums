import { UserService } from './../services/user.service';
import { IUser } from './../interfaces/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: IUser;

  constructor(private service: UserService, private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe((param) => {
      this.service.getUserById(+param.get('id')).subscribe(
        response => this.user = response.data
      );
    });
  }

  backToHome() {
    this.router.navigate(['']);
  }
}
