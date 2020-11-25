import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, ChangeDetectorRef } from '@angular/core';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { MyMaterialModule } from  './material.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserModel } from './model/user.model';
import { RestService } from './services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';


const routes: Routes = [
  { path: 'register', component: UserRegistrationComponent },
  { path: 'login', component: UserLoginComponent }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    UserLoginComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    RouterModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: 'register', component: UserRegistrationComponent },
      { path: 'login', component: UserLoginComponent },
    ]),   
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppComponent {
  label = 'ExcelMeet';
  title = 'Rencontres libres et sécurisées';
  auteur = 'Anguessan';
  public loggedUser: UserModel;
  showCurrentUser: Boolean;
  currentOp: number;
  homeLabelColor: String;
  
  hideDropDown: boolean;
  actionsList = [
  'Profil',
  'Deconnection'
  ];

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router, private cdRef:ChangeDetectorRef) { }

  ngAfterViewChecked()
  {
    console.log( "===> Changement d'item de menu" );
    this.cdRef.detectChanges();
  }

  ngAfterContentInit() {

    console.log( "===> Changement de contenu d'item de menu" );
    // change variable value here...
  } 

  ngOnInit() {
    this.hideDropDown = true;
    //this.currentOp = Op.accueil; //---Accueil;
    this.currentOp = 1;
    this.rest.setCurrentOperation('home');
    this.homeLabelColor = 'red';

    this.loggedUser = this.rest.getCurrentUser();
    this.showCurrentUser =  (this.loggedUser != null) && (this.loggedUser !== undefined);
    console.log("@@@ USER-SPACE.INIT: showCurrentUser="+this.showCurrentUser);
  }

  displayCurrentUser() {
    return "AppComponent: Non connecté";
  }

  isCurrentUser(): Boolean {
    this.loggedUser = this.rest.getCurrentUser();
    return ( (this.loggedUser === null) || (this.loggedUser === undefined) ) ? false : true;
  }

  onClickAction() {
    this.hideDropDown = true;
    console.log("%% onClickAction ...");
  }

  onActionChange(value) {
    console.log("%% VALUE="+value);
    if (value === 'Deconnection') {
      console.log("%% DECONNECTION...");
      this.showCurrentUser = false;
      this.rest.removeUser();
      this.loggedUser = null;
      this.router.navigate(['/']);
    }
  }

  getCurrentOp(): number {
    let currOp = this.rest.currentOperation;

    if (currOp == 'home')
      this.currentOp = 1;
    else 
        if (currOp == 'registration')
          this.currentOp = 2;
        else
          if (currOp == 'login')
            this.currentOp = 3;
          else
            if (currOp == 'space')
              this.currentOp = 4;
      
    console.log("%% this.currentOp="+this.currentOp);

    return this.currentOp;
  }

  /**
   * Home
   */
  showHomeItem() {
    return (this.rest.currentOperation !== 'space') ? true : false;
  }

  getHomeLabelColor() {
    return (this.rest.currentOperation === 'home') ? "red" : "white";
  }


  /**
   * Registration
   */
  showRegistrationItem() {
    return (this.rest.currentOperation !== 'space') ? true : false;
  }
  
  getRegistrationLabelColor() {
    return (this.rest.currentOperation === 'registration') ? "red" : "white";

  }
}
