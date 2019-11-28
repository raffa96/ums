import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { IUser } from "../interfaces/user.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getUsers(): Observable<any> {
    return this.http.get(environment.APIURL, {
      headers: this.auth.getAuthHeader()
    });
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(environment.APIURL + "/" + id, {
      headers: this.auth.getAuthHeader()
    });
  }

  createUser(user: IUser): Observable<any> {
    return this.http.post(environment.APIURL, user, {
      headers: this.auth.getAuthHeader()
    });
  }

  modifyUser(user: IUser): Observable<any> {
    user._method = "PUT";

    return this.http.post(environment.APIURL + "/" + user.id, user, {
      headers: this.auth.getAuthHeader()
    });
  }

  deleteUser(user: IUser): Observable<any> {
    user._method = "DELETE";

    return this.http.post(environment.APIURL + "/" + user.id, user, {
      headers: this.auth.getAuthHeader()
    });
  }
}
