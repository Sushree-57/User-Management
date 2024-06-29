import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// interface User
// {
//   user_name:string,
//   password:string,
//   f_name:string,
//   mob:string
// }
export class AuthService {

  constructor() { }
  addUser(user:any):void{
    console.log(user);
  //  localStorage.setItem('name',user_name);
  localStorage.setItem('userdetails',user);
  }
}
