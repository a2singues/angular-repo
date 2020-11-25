import { Component, OnInit } from '@angular/core';
import { UserModel } from '../model/user.model';
import { RestService } from '../services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
//import {  FileUploader } from 'ng2-file-upload';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadFileService } from '../services/upload-file.service';
import { FileInfosModel } from '../model/file.infos.model';

//const uploadAPI = 'http://localhost:4000/api/upload'; // better use a service class

@Component({
  selector: 'app-user-space',
  templateUrl: './user-space.component.html',
  styleUrls: ['./user-space.component.css'],
  //providers: [RestService]
})
export class UserSpaceComponent implements OnInit {

  loggedUser: UserModel;
  selectedUsers: UserModel[];
  showCurrentUser: Boolean;

  selectedUser: UserModel;
  showUsersList: Boolean;

  showPhotoUpload: boolean = false;

  genderList = [
    'Indéfinie',
    'Homme',
    'Femme',
    'Autre'
  ];
  
  hideDropDown: boolean;
  actionsList = [
  'Profil',
  'Deconnection'
  ];

  //public uploader: FileUploader = new FileUploader({ url: uploadAPI, itemAlias: 'file' });
  /*
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  */
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  //fileInfos: Observable<any>;
  userPhotos: FileInfosModel[];

  constructor(private http: HttpClient, public rest:RestService, private uploadService: UploadFileService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.hideDropDown = true;
    this.selectedUser = null;
    this.showUsersList = false;

    this.loggedUser = this.rest.getCurrentUser();
    this.showCurrentUser =  (this.loggedUser != null) && (this.loggedUser !== undefined);
    console.log("@@@ USER-SPACE.INIT: showCurrentUser="+this.showCurrentUser);
    if (! this.showCurrentUser) {
      this.rest.removeUser();
      this.loggedUser = null;
      this.router.navigate(['/']);
      this.showUsersList = false;
    }
    else {
      this.rest.loadUsers().subscribe((result) => {
        console.log("@@ RETUNED RESULT="+result);
        this.selectedUsers = result as UserModel[];
        console.log("@@ USERS LIST="+this.selectedUsers);
        this.showUsersList = true;
       });
    }
    /*
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('FileUpload:uploaded successfully:', item, status, response);
         alert('Your file has been uploaded successfully');
    };
    */
/*
    this.fileInfos = this.uploadService.getFiles("assi");
    console.log("### INIT FILES LIST: "+JSON.stringify(this.fileInfos));
    console.log("### INIT FILES LIST.RESPONSE: "+JSON.stringify(this.fileInfos.response));
*/

    this.uploadService.getFiles("assi").subscribe((data: any[])=>{
      console.log("### data="+data);
      //this.fileInfos = data;
      this.userPhotos = data as FileInfosModel[];

      //console.log("### INIT FILES LIST.PHOTOS: "+JSON.stringify(this.userPhotos));
      for (let i = 0; i < this.userPhotos.length; i++) {
       // console.log(" => File ITEM="+JSON.stringify(this.userPhotos[i]));
        console.log(" => File ITEM infos: name="+this.userPhotos[i].name+", url="+this.userPhotos[i].url);
      }
    });  

    this.rest.setCurrentOperation("space");

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

    /**
     * A user is selected
     */
    onSelectUser(value) {
      console.log("%% Selected USER="+value.id);
      this.selectedUser = value;
      this.showUsersList = false;
    }

    /**
     * Display my profile
     */
    openMyProfile() {
      console.log("%% DISPLAY MY PROFILE="+this.loggedUser);
      this.selectedUser = this.loggedUser;
      this.showUsersList = true;
      document.getElementById('buttonMyProfile').setAttribute("disabled","enabled");
    }

    /**
     * Upload a file
     */
    uploadNewFile() {
      console.log("@@@ =============>> uploadNewFile ...");
      this.showPhotoUpload = true;
    }

    closeUploadNewFile() {
      this.showPhotoUpload = false;
    }

    /**
     * Close the selected user infos
     */
    closeSelectedUser() {
      console.log("%% Close USER ...");
      this.selectedUser = null;
      this.showUsersList = true;
      document.getElementById('buttonMyProfile').removeAttribute("disabled");
    }

    /**
     * Remove a user
     */
    removeUser() {
      this.selectedUsers = this.selectedUsers.map(item => {
        delete item.id;
        return item;
      });   
    }

    /**
     * UPLOADING
     *
    fileProgress(fileInput: any) {
      this.fileData = <File>fileInput.target.files[0];
      this.preview();
    }

    preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/?/) == null) {
      return;
    }

    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
  }
*/

  /*
  onxSubmit() {
    const formData = new FormData();
      formData.append('file', this.fileData);
      this.http.post('url/to/your/api', formData)
        .subscribe(res => {
          console.log(res);
          this.uploadedFilePath = res.data.filePath;
          alert('SUCCESS !!');
        })
  }  

  onSubmit() {
    const formData = new FormData();
    formData.append('files', this.fileData);
     
    this.fileUploadProgress = '0%';
 
    this.http.post('https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload', formData, {
      reportProgress: true,
      observe: 'events'   
    })
    .subscribe(events => {
      if(events.type === HttpEventType.UploadProgress) {
        this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
        console.log(this.fileUploadProgress);
      } else if(events.type === HttpEventType.Response) {
        this.fileUploadProgress = '';
        console.log(events.body);          
        alert('SUCCESS !!');
      }
         
    }) 
}
*/

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  selectedPhoto(photo: FileInfosModel) {
    photo.selected = true;
    console.log("@@@ Selected Photo="+JSON.stringify(photo));
  }

  photoToRemove(photo: FileInfosModel) {
    console.log("@@@ Photo To remove ="+JSON.stringify(photo));
  }

  upload() {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    console.log("@@@ SELECTED FILE: "+this.currentFile.name);
    this.uploadService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          /*
          this.fileInfos = this.uploadService.getFiles("assi");
          console.log("@@@ FILES LIST: "+JSON.stringify(this.fileInfos));
          */
         this.uploadService.getFiles("assi").subscribe((data: any[])=>{
          console.log("###2 data="+data);
          //this.fileInfos = data;
          this.userPhotos = data as FileInfosModel[];

          //console.log("###2 INIT FILES LIST.RESPONSE: "+JSON.stringify(this.fileInfos));
          for (let i = 0; i < this.userPhotos.length; i++) {
            console.log("2 => File ITEM="+JSON.stringify(this.userPhotos[i]));
          }
        });  
    
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
