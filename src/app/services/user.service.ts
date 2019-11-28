import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  private apiURL = 'http://localhost:8000/users';

  constructor(private http: HttpClient, private auth: AuthService) { }

  getUsers(): Observable<any> {
    return this.http.get(this.apiURL, { headers: this.auth.getAuthHeader() });
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(this.apiURL + '/' + id, { headers: this.auth.getAuthHeader() });
  }

  createUser(user: IUser): Observable<any> {
    return this.http.post(this.apiURL, user, { headers: this.auth.getAuthHeader() });
  }

  modifyUser(user: IUser): Observable<any> {
    user._method = 'PUT';

    return this.http.post(this.apiURL + '/' + user.id, user, { headers: this.auth.getAuthHeader() });
  }

  deleteUser(user: IUser): Observable<any> {
    user._method = 'DELETE';

    return this.http.post(this.apiURL + '/' + user.id, user, { headers: this.auth.getAuthHeader() });
  }
}
