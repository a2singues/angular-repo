import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMaterialModule } from  './material.module';

import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserLoginComponent } from './user-login/user-login.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserSpaceComponent } from './user-space/user-space.component';
import { RestService } from './services/rest.service';
import { UploadFileService } from './services/upload-file.service';

registerLocaleData(localeFr, 'fr');

const appRoutes: Routes = [
  {
    path: 'home',
    component: UserHomeComponent,
    data: { title: 'Page d\'accueil' }
  },
  {
    path: 'register',
    component: UserRegistrationComponent,
    data: { title: 'Création de compte' }
  },
  {
    path: 'login',
    component: UserLoginComponent,
    data: { title: 'Connection' }
  },
  {
    path: 'userspace',
    component: UserSpaceComponent,
    data: { title: 'Espace utilisateur' }
  }  
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    UserHomeComponent,
    UserSpaceComponent
   ],
imports: [
    //RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    //FormControl, 
    ReactiveFormsModule,
    MyMaterialModule,
    HttpClientModule,
    //FileUploadModule,
    /*,
    RouterModule.forRoot([
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: 'register', component: UserRegistrationComponent },
      { path: 'login', component: UserLoginComponent },
    ]),
    */
   RouterModule.forRoot([
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: UserHomeComponent },
    { path: 'register', component: UserRegistrationComponent },
    { path: 'login', component: UserLoginComponent },
    { path: 'userspace', component: UserSpaceComponent },
  ]),
],
  providers: [RestService, UploadFileService, {provide: LOCALE_ID, useValue: "fr-CA" } ],
  bootstrap: [AppComponent]
})


export class AppModule { }