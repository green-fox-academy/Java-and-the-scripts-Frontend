import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './components/homepage/homepage.component';
import { MyQueueComponent } from './components/my-queue/my-queue.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SelectQueueComponent } from './components/select-queue/select-queue.component';
import { AuthorizationGuard } from './guards/authorization.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'home', component: HomepageComponent, canActivate: [AuthorizationGuard]},
  {path: 'queue', component: SelectQueueComponent, canActivate: [AuthorizationGuard]},
  {path: 'myqueue', component: MyQueueComponent,canActivate: [AuthorizationGuard]},
  {path: '', redirectTo: '/register', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
