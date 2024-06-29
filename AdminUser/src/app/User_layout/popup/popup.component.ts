import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
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
import { AuthService } from '../user_services/auth.service';
import User from '../../DTO/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'popup.component',
  templateUrl: 'popup.component.html',
  styleUrl: 'popup.component.css',
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
export class PopupComponent {
  addForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ref: MatDialogRef<PopupComponent>,
    private auth: AuthService,private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.addForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullName: ['', Validators.required],
      mobile: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
          ),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.addForm.valid) {
      const user:User = this.addForm.getRawValue(); 
      this.auth.addUser(user).subscribe({
        next: (data: any) => {
          console.log(data);
          this.toastr.success('Data Successfully Added..!!!','Congratulation');
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















  // readonly userName = new FormControl('', [Validators.required, Validators.email]);
  // readonly password = new FormControl('', [Validators.required]);
  // readonly fullName = new FormControl('', [Validators.required]);
  // readonly mobile = new FormControl('', [
  //   Validators.required,
  //   Validators.pattern(
  //     /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
  //   ),
  // ]);

  // errorMessage = signal('');

  // constructor(private ref: MatDialogRef<PopupComponent>,private formBuilder: FormBuilder,private auth: AuthService) {
  //   merge(this.userName.statusChanges, this.userName.valueChanges)
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
  //   if (this.userName.hasError('required')) {
  //     this.errorMessage.set('You must enter email ID');
  //   } else if (this.userName.hasError('email')) {
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
  //   if (this.fullName.hasError('required')) {
  //     this.errorMessage.set('You Must Enter Full Name');
  //   } else {
  //     this.errorMessage.set('');
  //   }
  // }
  // updateMob() {
  //   if (this.mobile.hasError('required')) {
  //     this.errorMessage.set('You Must Enter Mobile Number');
  //   } else if (this.mobile.hasError('pattern')) {
  //     this.errorMessage.set('Not a valid Mobile number');
  //   } else {
  //     this.errorMessage.set('');
  //   }
  // }

  // addform=this.formBuilder.group({
  //   // email:[""],
  //   // password:[''],
  //   // fullName:[''],
  //   // mob:['']
  //   userName: ["", [Validators.required, Validators.email]],
  // password: ["", Validators.required],
  // fullName: ["", Validators.required],
  // mobile: ["", [Validators.required, Validators.pattern(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)]]
  // })
  // onadd(): void {
  //   if (this.addform.valid) {
  //     console.log(this.addform.value);
  //     this.auth.addUser(this.addform.value).subscribe({
  //       next: (data: any) => {
  //         console.log(data);
  //         this.closepopup();
  //       },
  //       error: (e: any) => console.error(e)
  //     });
  //   }
  // }
}
