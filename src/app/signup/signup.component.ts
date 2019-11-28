import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  title = 'Registrati';

  constructor(private auth: AuthService, private router: Router) {
    auth.userSignedUp.subscribe(
      () => {
        router.navigate(['']);
      }
    );
  }

  ngOnInit() { }

  signUp(form: NgForm) {
    this.auth.signUp(form.value.name, form.value.email, form.value.password);
  }
}
