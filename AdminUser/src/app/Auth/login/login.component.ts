import { Component } from '@angular/core';
import { AbstractControl, FormBuilder,ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  
  constructor(private formBuilder: FormBuilder,private auth: AuthService,private router: Router,private toastr: ToastrService) {}
  
  logform=this.formBuilder.group({
    email: ['',[Validators.required,Validators.email]],
    password: ['',Validators.required],
  });
  getControl(name:any):AbstractControl | null
  {
    return this.logform.get(name);
  }
  
  onSubmit():void {
    
      if (this.logform.valid) {
        this.auth.login(this.logform.value).subscribe({
          next: (result) => {
            this.router.navigate(['admin']);
          },
           error: (e) => {
            this.toastr.error(e.error.message, 'Error');
           }
        });
      }
    }
  }

