import { Routes } from '@angular/router';
import { HomeComponent } from './User_layout/home/home.component';
import { LoginComponent } from './Auth/login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { NotFoundComponent } from './Auth/not-found/not-found.component';
import { authGuard } from './Guard/auth.guard';

export const routes: Routes = [
    {'path' : 'admin', 
        canActivate : [authGuard],
        component : HomeComponent},
    {'path' : 'login', component : LoginComponent},
    {'path' : 'user', component : UserDashboardComponent},
    {'path' : '', redirectTo : '/login', pathMatch: 'full'},
    {'path' : '**' , component : NotFoundComponent}
    
];
