import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MyQueueComponent } from './components/my-queue/my-queue.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './services/authentication/authentication.service';
import { DoctorSelectorComponent } from './components/doctor-selector/doctor-selector.component';
import { SelectQueueComponent } from './components/select-queue/select-queue.component';
import { AuthorizationConfigInterceptor } from './interceptors/authorization-config.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    MyQueueComponent,
    RegistrationComponent,
    LoginComponent,
    DoctorSelectorComponent,
    SelectQueueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationConfigInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
