import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { DoctorSelectorComponent } from './components/doctor-selector/doctor-selector.component';
import { SelectQueueComponent } from './components/select-queue/select-queue.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'home', component: HomepageComponent},
  {path: 'doctors', component: DoctorSelectorComponent},
  {path: 'queue', component: SelectQueueComponent},
  {path: 'myqueue', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
