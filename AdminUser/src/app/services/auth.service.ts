import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,private http:HttpClient) { }

  setToken(token : string):void{
    localStorage.setItem('token',token);
  }
  getToken():string | null{
    return localStorage.getItem('token');
  }
  isLoggedIn():boolean{
    return this.getToken()!== null;  
  }
  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
  login(loginData:any):Observable <any>{
    // console.log(email);
    // console.log(password);
    // if(email === 'admin@gmail.com' && password === '123'){
    //   this.setToken('sdshfbdhvbsjdfhvfbj');
      return this.http.post("http://localhost:8000/api/auth/login",loginData).pipe(
        tap((res:any)=>this.setToken(res.token))
      );
    // }
    return throwError(new Error('Failed to login')); 
    
  }
  
}

