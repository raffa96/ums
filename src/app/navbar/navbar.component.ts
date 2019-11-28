import { IUser } from './../interfaces/user.interface';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  brand = 'User Management System';

  showMenu = false;

  username: string;

  isUserLoggedIn = false;

  constructor(private auth: AuthService, private router: Router) {
    auth.userSignedUp.subscribe(
      (user: IUser) => {
        this.username = user.name;

        this.isUserLoggedIn = true;
      }
    );

    auth.userLoggedIn.subscribe(
      (user: IUser) => {
        this.username = user.name;

        this.isUserLoggedIn = true;
      }
    );

    auth.userLoggedOut.subscribe(() => this.isUserLoggedIn = false);
  }

  ngOnInit() {
    this.isUserLoggedIn = this.auth.isUserLoggedIn();

    if (this.isUserLoggedIn) {
      const user = this.auth.getUser();

      this.username = user.name;
    }
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  signUp(event) {
    event.preventDefault();

    this.router.navigate(['signup']);
  }

  login(event) {
    event.preventDefault();

    this.router.navigate(['login']);
  }

  logout(event) {
    event.preventDefault();

    this.auth.logout();

    setTimeout(() => {
      this.router.navigate(['login']);
    }, 300);
  }

  backToHome(event) {
    event.preventDefault();

    this.router.navigate(['']);
  }
}
