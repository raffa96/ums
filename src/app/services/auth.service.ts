import { IUser } from "./../interfaces/user.interface";
import { IJWT } from "./../interfaces/jwt.interfaces";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { User } from "./../classes/user.class";
import { Injectable, Output, EventEmitter } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable()
export class AuthService {
  private authHeader = new HttpHeaders({
    Authorization: "Bearer " + this.getToken()
  });

  private isUserLogged = false;

  @Output() userSignedUp = new EventEmitter<User>();

  @Output() userLoggedIn = new EventEmitter<User>();

  @Output() userLoggedOut = new EventEmitter<User>();

  constructor(private http: HttpClient) {}

  getUser(): IUser {
    const data = JSON.parse(localStorage.getItem("user"));

    const user = new User();

    if (data) {
      user.name = data.name;

      user.email = data.email;
    }

    return user;
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getAuthHeader(): HttpHeaders {
    return this.authHeader;
  }

  isUserLoggedIn() {
    this.isUserLogged = !!localStorage.getItem("token");

    return this.isUserLogged;
  }

  signUp(name: string, email: string, password: string) {
    const user = new User();

    user.name = name;

    user.email = email;

    this.http
      .post(environment.APIAUTH + "signup", { name, email, password })
      .subscribe(
        (response: IJWT) => {
          localStorage.setItem("token", response.access_token);

          localStorage.setItem("user", JSON.stringify(response));

          this.userSignedUp.emit(user);
        },
        (httpResponse: HttpErrorResponse) => {
          alert(httpResponse.message);
        }
      );
  }

  login(email: string, password: string) {
    this.http
      .post(environment.APIAUTH + "login", { email, password })
      .subscribe(
        (response: IJWT) => {
          localStorage.setItem("token", response.access_token);

          localStorage.setItem("user", JSON.stringify(response));

          const user = new User();

          user.name = response.name;

          user.email = response.email;

          this.userLoggedIn.emit(user);
        },
        (httpResponse: HttpErrorResponse) => {
          alert(httpResponse.message);
        }
      );
  }

  logout() {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    this.userLoggedOut.emit();

    this.isUserLogged = false;
  }
}
