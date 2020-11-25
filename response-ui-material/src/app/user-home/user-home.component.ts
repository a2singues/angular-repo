import { Component, OnInit, ViewChild, ElementRef, HostListener, HostBinding } from '@angular/core';
import { UserModel } from '../model/user.model';
import { RestService } from '../services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UploadFileService } from '../services/upload-file.service';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
  //providers: [RestService]
})
/*
@NgModule({
  declarations: [
     UserHomeComponent
  ],
  imports: [
     MatSelectModule,
   ],
  providers: [RestService],
  bootstrap: [UserHomeComponent]
})
*/

export class UserHomeComponent implements OnInit {

  model: any;

   // Make sure container can receive focus or else blur events won't be seen.
   @HostBinding('attr.tabindex') tabindex = '0';
   @HostBinding('attr.id') id;
   /*
   @HostListener('blur', ['$event.target']) onBlur(target) {
    console.log("%% ON BLUR: action="+JSON.stringify(target));
    this.messageSubject.next(`onBlur(${this.id}): ${new Date()} - ${JSON.stringify(target)}`);
   }
   @HostListener('change', ['$event.target']) onchange(target) {
    console.log("%% ON CHANGE: action="+JSON.stringify(target));
    this.messageSubject.next(`onChange(${this.id}): ${new Date()} - ${JSON.stringify(target)}`);
   }
   */


  // =========== Just for Illustrating Blur Event =============
  alertClosed: boolean = false;
  messageSubject = new Subject<string>();
  message: string = "blur messages appear here";

 @ViewChild('actionSelect', {static: false}) actionSelect: ElementRef;

/*
  @ViewChild('mySelect') mySelect;
  foods = [
    {value: 'profil-0', viewValue: 'Profil'},
    {value: 'logout-1', viewValue: 'Deconnection'}
  ];
*/
  hideDropDown: boolean;
  actionsList = [
  'Profil',
  'Deconnection'
  ];

  loggedUser: UserModel;
  showCurrentUser: Boolean;
  homeLabelColor: String;

  /*--- UPLOAD --*/
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  uploadMessage = '';

  fileInfos: Observable<any>;

  constructor(private http: HttpClient, public rest:RestService, private uploadService: UploadFileService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    setTimeout(() => this.alertClosed = true, 2000);
    this.messageSubject.subscribe((msg) => this.message = msg);
    this.messageSubject.pipe(debounceTime(5000)).subscribe(() => this.message = null);

    this.hideDropDown = true;
    console.log("@@@@@@@@> INIT: "+this.loggedUser);
    this.loggedUser = this.rest.getCurrentUser();
    console.log("@@@@@@@@> GET CURR USER: "+this.loggedUser);

    //this.actionSelect.nativeElement.focus();

    this.displayCurrentUser();
    this.rest.setCurrentOperation("home");
    this.homeLabelColor = 'red';

   }

  displayCurrentUser() {
    console.log("@@@@@@@@> CURRENT USER: ID="+this.loggedUser);
    //return this.currentUser.email;
    return this.showCurrentUser =  (this.loggedUser != null) && (this.loggedUser !== undefined);
  }

  onClickAction() {
    this.hideDropDown = true;
    console.log("%% onClickAction ...");

  }

  onChange(value) {
    console.log("%% VALUE="+value);
    if (value === 'Deconnection') {
      console.log("%% DECONNECTION...");
      this.showCurrentUser = false;
      this.rest.removeUser();
      this.loggedUser = null;
      this.router.navigate(['/']);
    }
  }

  onClickButton() {
    console.log("%% CLICK SUR MOI ...");
  }

  onFocusButton() {
    console.log("%% FOCUS SUR MOI ...");
  }

  someMethodWithFocusOutEvent() {
    console.log('%% Your method called');
  }

  /*---TEST UPLOAD --*/
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    console.log("@@@ SELECTED FILE: "+this.currentFile.name);
    this.uploadService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
          console.log("@@@ ========= Upload progress event: "+JSON.stringify(event)+" ====================");
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          console.log("@@@ ========= Upload response event: "+JSON.stringify(event)+" ====================");
          this.fileInfos = this.uploadService.getFiles("assi");
        }
      },
      err => {
        console.log("***  ERREUR UPLOAD: "+JSON.stringify(err));
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

    this.selectedFiles = undefined;
  }

}
