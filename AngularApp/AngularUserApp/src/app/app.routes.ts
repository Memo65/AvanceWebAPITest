import { Routes } from '@angular/router';
import { UserListComponent } from './Components/user-list/user-list.component';
import { UserFormComponent } from './Components/user-form/user-form.component';
import { LoginComponent } from './Components/login/login.component';
import { SigninComponent } from './Components/signin/signin.component';
import { authGuard } from './Custom/auth.guard';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signin', component: SigninComponent},
    {path: 'home', component: UserListComponent, canActivate:[authGuard]},
    {path: 'user/:id', component: UserFormComponent, canActivate:[authGuard]},
    
];
