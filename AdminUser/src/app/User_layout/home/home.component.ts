import { Component, ViewChild, viewChild } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../user_services/auth.service';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { MaterialModule } from './material-module';
import { Editpopup } from '../popup/editpopup/editpopup.component';
import User from '../../DTO/User';
import { DeleteComponent } from '../popup/delete/delete.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    MatIconModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private auth: AuthService, private dialog: MatDialog) {}
  displayedColumns: string[] = [
    'status',
    'userName',
    'password',
    'fullName',
    'mobile',
    'action',
  ];
  filterChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.userDataSource.filter = value;
  }
  ngOnInit(): void {
    this.GetAll();
    this.auth.RefreshRequired.subscribe(() => this.GetAll());
  }
  userDataSource: any;
  GetAll() {
    this.auth.getallUser().subscribe({
      next: (data: any) => {
        // console.log(data);
        this.userDataSource = new MatTableDataSource<User>(data);
        this.userDataSource.paginator = this.paginator;
        this.userDataSource.sort = this.sort;
      },

      error: (e: any) => console.error(e),
    });
  }

  Openpopup() {
    this.dialog.open(PopupComponent, {
      width: '60%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        tittle: 'User Edit',
      },
    });
  }
  Editpopup(element: any) {
    this.dialog.open(Editpopup, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: element,
    });
  }
  DeletePopup(id: any) {
    // console.log(id);
    this.dialog.open(DeleteComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      width: '30%',
      data: id,
    });
  }
}
