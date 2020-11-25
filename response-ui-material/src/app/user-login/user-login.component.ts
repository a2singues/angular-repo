import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MyMaterialModule } from '../material.module';
import { FormsModule,FormControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserModel } from '../model/user.model';
import { RestService } from '../services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
  //providers: [RestService]
})
export class UserLoginComponent implements OnInit {

  showError: boolean = false;

  @Input() userData = { email:'', password:''};
  //@Output() loggedUserEvent = new EventEmitter();

  user: UserModel;

  fc_password: FormControl;
  fc_email: FormControl;

  errMessage: string = '';

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit() {
      console.log("@@ REST arg="+this.rest);
      this.fc_password = new FormControl('');
      this.fc_email = new FormControl('');

      this.rest.setCurrentOperation("login");
      
  }

  onEMail() {
    console.log("@@ EMail saisi="+this.fc_email.value);
    //this.firstName.markAsTouched();
    if ( (this.fc_email.value === undefined) || (this.fc_email.value === '') ) {
      this.fc_email.setErrors(null);
      this.fc_email.setErrors({ 'required': true });
    }
    else
      console.log("@@ Email address=", this.fc_email.value);
  }

  onPassword() {
    console.log("@@ Password saisi="+this.fc_password.value);
    //this.firstName.markAsTouched();
    if ( (this.fc_password.value === undefined) || (this.fc_password.value === '') )
      this.fc_password.setErrors({ 'required': true });
    else
      console.log("@@ Password=", this.fc_password.value);
  }

  /**
   * Enregistrement de l'utilisateur
   */
  getUser() {
    console.log("$$ LOGIN DATA="+JSON.stringify(this.userData));
    console.log("$$ REST="+this.rest);

    console.log("$$ EMAIL="+this.fc_email.value);
    console.log("$$ PWD="+this.fc_password.value);

    this.userData.email = this.fc_email.value;
    //this.fc_password.setValue('az12345');
    this.userData.password = this.fc_password.value;

    this.rest.getUser(this.userData).subscribe((result) => {
      console.log("@@ RETUNED RESULT="+result);
      //this.errMessage = result.error.message;
      this.user = result as UserModel;

      this.rest.setCurrentUser(this.user);

      console.log("@@ GET USER ID="+this.user.id);
      this.errMessage = "OK: "+this.user.lastName;
      this.showError = true;
      //this.rest.routeToHome(this.user);
      //this.loggedUserEvent.emit(this.user);
      this.rest.setCurrentUser(this.user);
      this.router.navigate(['/userspace']);
    }, (err) => {
      console.log("## ===============> Erreur statut: "+err.status);
      console.log("## ===============> Erreur: "+err.message);
      if (err.status == 404)
        this.errMessage = "Adresse mail et/ou mot de passe invalide";
      else
        this.errMessage = "Serveur introuvable";
      
      this.showError = true;
      
    });

  }
  displayError() {
    //console.debug('@@ ERREUR !')
    return this.errMessage;
  }

  displayCurrentUser() {
     return "Login: Non connecté";
  }

}
