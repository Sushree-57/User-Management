import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../../DTO/User';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private refreshRequired = new Subject<void>();

  get RefreshRequired() {
    return this.refreshRequired;
  }
  getallUser(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8000/api/users/');
  }
  addUser(user: User): Observable<any> {
    console.log(user);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http
      .post('http://localhost:8000/api/users/', user, { headers })
      .pipe(tap(() => this.RefreshRequired.next()));
  }
  editUser(user: any): Observable<any> {
    console.log(user);
    return this.http
      .patch('http://localhost:8000/api/users/' + user.id, user)
      .pipe(tap(() => this.RefreshRequired.next()));
  }
  deleteUser(id: any): Observable<any> {
    // console.log(id);
    return this.http
      .delete('http://localhost:8000/api/users/' + id)
      .pipe(tap(() => this.RefreshRequired.next()));
  }
}
