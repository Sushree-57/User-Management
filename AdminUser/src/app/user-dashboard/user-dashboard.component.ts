import { Component } from '@angular/core';
import { FooterComponent } from '../User_layout/footer/footer.component';
import { HeaderComponent } from '../User_layout/header/header.component';


@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

}
