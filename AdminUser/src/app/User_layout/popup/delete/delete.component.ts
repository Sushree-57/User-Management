import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../home/material-module';
import { AuthService } from '../../user_services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [MatDialogActions,MatDialogContent,MaterialModule],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private id:any,private auth:AuthService,private ref: MatDialogRef<DeleteComponent>,private toastr: ToastrService){}
  onDeleteSubmit(){
    // console.log(this.id);
    this.auth.deleteUser(this.id).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.toastr.warning('Data Successfully Deleted..!!!','Information');
        this.closepopup();
      },
      error: (e: any) =>{
        console.error(e);
        this.toastr.error('Something wrong....!!!','Error');
      } 
    });
  }
  closepopup() {
    this.ref.close();
   }
}
