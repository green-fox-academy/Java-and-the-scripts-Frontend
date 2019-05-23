import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MyQueueComponent } from './components/my-queue/my-queue.component';

const routes: Routes = [
  {path: 'home', component: HomepageComponent},
  {path: 'myqueue', component: MyQueueComponent},
  // {path: '', redirectTo: '/register', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
