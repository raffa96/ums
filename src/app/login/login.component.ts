import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Login';

  constructor(private auth: AuthService, private router: Router) {
    auth.userLoggedIn.subscribe(
      () => {
        router.navigate(['']);
      }
    );
  }

  ngOnInit() { }

  login(form: NgForm) {
    if (!form.valid) {
      return false;
    }

    this.auth.login(form.value.email, form.value.password);
  }
}
