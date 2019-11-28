import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { RoutesGuardService } from './services/routes-guard.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ModifyUserComponent } from './modify-user/modify-user.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users',
    canActivate: [RoutesGuardService]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [RoutesGuardService]
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user/new',
    component: AddUserComponent,
    canActivate: [RoutesGuardService]
  },
  {
    path: 'user/:id/edit',
    component: ModifyUserComponent,
    canActivate: [RoutesGuardService]
  },
  {
    path: 'user/:id/details',
    component: UserDetailsComponent,
    canActivate: [RoutesGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RoutesGuardService]
})
export class AppRoutingModule { }
