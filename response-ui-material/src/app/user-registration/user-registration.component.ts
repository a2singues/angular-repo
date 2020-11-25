//import { NgModule} from '@angular/core';
import { Component, OnInit, Input, SimpleChanges, ViewChild, ViewEncapsulation} from '@angular/core';
//import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MyMaterialModule } from '../material.module';
import { FormsModule,FormControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

import { UserModel } from '../model/user.model';
import { RestService } from '../services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { debug } from 'util';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
  //providers: [RestService]
})
/*
@NgModule({
  imports: [
    ReactiveFormsModule, 
    //UserModel,
    FormsModule,
    RestService,
    NgForm,
    FormBuilder,
    FormControl,
    FormGroup,
    Input,
    MyMaterialModule
  ],
  exports: [FormBuilder, FormControl, ReactiveFormsModule, MyMaterialModule]
})
*/

export class UserRegistrationComponent implements OnInit {

  showError: boolean = false;

  @Input() userData = { id:'',firstName:'Ghislain', lastName: 'Nguessan', address:'15 bld Gouvion St Cyr', gender: 1, password:'az12345',
    email:'assi.nguessan@free.fr', birthDate:'01/04/1964' }; 
   // firstName: FormControl;
   fc_fName: FormControl;
   fc_lName: FormControl;
   fc_address: FormControl;
   fc_gender: FormControl;
   fc_password: FormControl;
   fc_email: FormControl;
   fc_birthdate: FormControl;

   lastName: FormControl;
   user: UserModel;

 /* 
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });
*/
  //_firstName: FormControl;

  fieldLastname: boolean = false;
  errMessage: string = '';

  //constructor() { }

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  
  ngOnInit() {
    console.log("@@ REST arg="+this.rest);
    // this.firstName = new FormControl('');
    this.fc_fName = new FormControl('');
    this.fc_lName = new FormControl('');
    this.fc_address = new FormControl('');
    this.fc_gender = new FormControl('1');
    this.fc_password = new FormControl('');
    this.fc_email = new FormControl('');
    this.fc_birthdate = new FormControl('');

    //this.rest = new RestService(router);

    //this.user = new UserModel('0','Assi','Nguessan',1, '17 bld Gouvion Paris 17','a@f.fr', new Date());
    this.rest.setCurrentOperation("registration");
  }

  onFirstName() {
    //this.firstName.markAsTouched();
    if (this.fc_fName.value === '')
      this.fc_fName.setErrors({ 'required': true });
    //else
    //  console.log("@@ FirstName=", this.fc_fName.value);
  }

  onLastName() {
    //this.firstName.markAsTouched();
    if (this.fc_fName.value === '')
      this.fc_lName.setErrors({ 'required': true });
    else
      console.log("@@ FirstName=", this.fc_lName.value);
  }

  onAddress() {
    //this.firstName.markAsTouched();
    if (this.fc_address.value === '')
      this.fc_address.setErrors({ 'required': true });
//    else
//      console.log("@@ Address=", this.fc_address.value);
  }

  onMail() {
    console.log("@@ MAIL saisi!");
  }

  onInputGender() {
    console.log("@@ [gender]=",this.fc_gender.value);
  }

  /**
   * Enregistrement de l'utilisateur
   */
  register() {
    /*
    this.userData.ud_fName = this.fc_fName.value;
    this.userData.ud_lName = this.fc_lName.value;

    this.userData.ud_address = this.fc_address.value ;
    this.userData.ud_gender = this.fc_gender.value;
    this.userData.ud_password = this.fc_password.value ;
    this.userData.ud_email = this.fc_email.value ;
    this.userData.ud_birthdate = this.fc_birthdate.value;
*/
    console.log("$$ USER DATA="+JSON.stringify(this.userData));
    console.log("$$ REST="+this.rest);

    this.rest.registerUser(this.userData).subscribe((result) => {
      //this.router.navigate(['/product-details/'+result._id]);
     console.log("@@ RETUNED RESULT="+result.error.message);
     this.errMessage = result.error.message;
     console.log("@@ NEW USER ID="+result._id);
    }, (err) => {
      console.log("## ===============> Erreur value: "+err.value);
      console.log("## ===============> Erreur: "+err.message);
      this.fc_fName.setErrors({ 'invalid': true });
      this.fc_fName.setErrors({ 'conflict': true });
      this.errMessage = "Serveur introuvable";
      
      this.showError = true;
      
    });

  }
  displayError() {
    console.debug('@@ ERREUR !')
    return this.errMessage;
  }

  displayCurrentUser() {
    return "Registration: Non connecté";
 }


}
