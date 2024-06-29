import { ChangeDetectionStrategy, Component, Inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list';
import { AuthService } from '../../user_services/auth.service';
import { PopupComponent } from '../popup.component';
import User from '../../../DTO/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'editpopup.component',
  templateUrl: 'editpopup.component.html',
  styleUrl: 'editpopup.component.css',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogTitle,
    MatDividerModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogContent,
    MatButtonModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Editpopup {

  editform !: FormGroup;
 
  constructor(private formBuilder:FormBuilder,private ref: MatDialogRef<Editpopup>,@Inject(MAT_DIALOG_DATA) private data:any, private auth:AuthService,private toastr: ToastrService){}
  ngOnInit(){
    this.editform=this.formBuilder.group({
      id:[''],
      user:['',[Validators.required,Validators.email]],
      fullName:['',Validators.required],
      mobile:['',[Validators.required,Validators.pattern(
        /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
          ),]],
    });
    if(this.data!=null){
      this.LoadEditData(this.data);
    }
  }
  LoadEditData(data:any)
  {
    this.editform.setValue({
      id:data.id,
      user:data.userName,
      fullName:data.fullName,
      mobile:data.mobile,
    })
  }

  
  onedit(){
   
    if(this.editform.valid){
    const user:User=this.editform.getRawValue();
    this.auth.editUser(user).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toastr.info('Data Successfully Edited..!!!','Congratulation');
        this.closepopup();
      },
      error: (e: any) =>{
        console.error(e);
        this.toastr.error('Something wrong....!!!','Error')
      } 
    });
    }
   
  }
  closepopup() {
      this.ref.close();
     }










  // readonly email = new FormControl('', [Validators.required, Validators.email]);
  // readonly password = new FormControl('', [Validators.required]);
  // readonly f_name = new FormControl('', [Validators.required]);
  // readonly mob = new FormControl('', [
  //   Validators.required,
  //   Validators.pattern(
  //     /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
  //   ),
  // ]);

  // errorMessage = signal('');

  // constructor(private ref: MatDialogRef<Editpopup>,private formBuilder: FormBuilder,private auth: AuthService) {
  //   merge(this.email.statusChanges, this.email.valueChanges)
  //     .pipe(takeUntilDestroyed())
  //     .subscribe(() => this.updateErrorMessage());
  // }
  // closepopup() {
  //   this.ref.close();
  // }
  // editpopup() {
  //   this.ref.close();
  // }

  // updateErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     this.errorMessage.set('You must enter email ID');
  //   } else if (this.email.hasError('email')) {
  //     this.errorMessage.set('Not a valid email');
  //   } else {
  //     this.errorMessage.set('');
  //   }
  // }
  // updatePassword() {
  //   if (this.password.hasError('required')) {
  //     this.errorMessage.set('You must enter Password');
  //   } else if (this.password.hasError('password')) {
  //     this.errorMessage.set('Not a valid password');
  //   } else {
  //     this.errorMessage.set('');
  //   }
  // }
  // updateName() {
  //   if (this.f_name.hasError('required')) {
  //     this.errorMessage.set('You Must Enter Full Name');
  //   } else {
  //     this.errorMessage.set('');
  //   }
  // }
  // updateMob() {
  //   if (this.mob.hasError('required')) {
  //     this.errorMessage.set('You Must Enter Mobile Number');
  //   } else if (this.mob.hasError('pattern')) {
  //     this.errorMessage.set('Not a valid Mobile number');
  //   } else {
  //     this.errorMessage.set('');
  //   }
  // }


  // editform=this.formBuilder.group({
  //   euser_name:[''],
  //   epassword:[''],
  //   ef_name:[''],
  //   emob:['']
  // })
  // onedit():void{
  //   if(this.editform.valid){
  //     console.log(this.editform.value);
  //   this.auth.editUser(this.editform.value);
  //   }
    
    // localStorage.setItem('adduser',JSON.stringify(this.addform));
  // }
  // editControl(name:any):AbstractControl | null
  // {
  //   return this.editform.get(name);
  // }
  // editControl():void{
  //   if(this.editform.valid){
  //     console.log(this.editform.value);
  //     this.auth.addUser(this.editform.value);
  //   }
    
  // }
}
