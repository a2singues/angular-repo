import { async, fakeAsync, ComponentFixture, TestBed, tick, inject, flush } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { UserLoginComponent } from './user-login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatTableModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RestService } from '../services/rest.service';

import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { UserModel } from '../model/user.model';
import { MockRestService } from '../services/rest.service.mock';
import { HttpRequest, HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
//import { of } from 'rxjs-compat/observable/of';

const endpoint = 'http://localhost:8080/api/v1/';

const mockInputUser = 
  { id:'1234', password:'az12345', email:'assi.nguessan@free.fr' 
  };

const mockOutputUser = 
  { id:'',firstName:'Assi', lastName: 'Nguessan', address:'15 bld Gouvion St Cyr', 
    gender: 1, password:'az12345', email:'assi.nguessan@free.fr', birthDate:'01/04/1964' 
  };

const userData: UserModel = {
    id:'123456789',fName:'Assi', lastName: 'Nguessan', address:'15 bld Gouvion St Cyr', 
    gender: 1, password:'az12345', email:'anguessan@free.fr', birthDate: new Date('01/04/1964')
  };

const mockUsersList = [
    { id:'12',firstName:'Assi', lastName: 'Nguessan', address:'15 bld Gouvion St Cyr', 
      gender: 1, password:'az12345', email:'assi.nguessan@free.fr', birthDate:'01/04/1964' 
    },
    { id:'123',firstName:'Ghislain', lastName: 'Nguessan', address:'15 bld Gouvion St Cyr', 
      gender: 1, password:'az12345', email:'nghis@free.fr', birthDate:'05/09/1997' 
    }
  ];

const spyRestService: jasmine.SpyObj<RestService> = jasmine.createSpyObj(
  'spyRestService', ['getUser','setCurrentUser']
);
//spyRestService.getUser.and.returnValue(of('{id:"123456789"}'));
//spyRestService.setCurrentUser.

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;
  //let submitEl: DebugElement;
  let mailEl: DebugElement;
  let passwordEl: DebugElement;

  let httpMock: HttpTestingController;
  let service: RestService;
  let injector;

  beforeEach(async(() => {
    injector = TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
                HttpClientTestingModule,
                RouterTestingModule,
                FormsModule,
                MatButtonModule,
                MatTableModule,
                MatMenuModule,
                MatToolbarModule,
                MatIconModule,
                MatCardModule,
                NoopAnimationsModule,
      ],
      declarations: [ UserLoginComponent ],
      providers: [RestService, HttpTestingController, MockRestService, 
        {
          provide: RestService,
          useClass: MockRestService,
          useValue: spyRestService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    console.log("### Init component 1="+component+" ***");
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    console.log("### Debug element ...");

    service = TestBed.get(MockRestService);
    httpMock = TestBed.get(HttpTestingController);

    //service = injector.get(MockRestService);
    //httpMock = injector.get(HttpTestingController);

    mailEl = fixture.debugElement.query(By.css('input[type=email]'));
    console.log("### Debug element mailEl="+mailEl);
    passwordEl = fixture.debugElement.query(By.css('input[type=password]'));
    console.log("### Debug element passwordEl="+passwordEl);

//component.ngOnInit();
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*--- Get user ---*/
  it('Should get a user', () => {
    service.getUser(mockInputUser).subscribe(returnedUser => {
      expect(returnedUser).toEqual(mockOutputUser);
    });

  });

  //it('Entering email and password emits loggedIn event', fakeAsync(() => {
  it('Entering email and password emits loggedIn event', (done: DoneFn) => {
    //let userData: UserModel = new UserModel();
    mailEl.nativeElement.value = "assi.nguessan@free.fr";
    passwordEl.nativeElement.value = "az12345";

    service.loadUsers().subscribe(done);
 /*-------
    tick();

    const req = httpMock.expectOne(req => req.method === 'GET' && req.url === endpoint + 'getuser/'+userData.email+'/'+userData.password);

    req.flush(mockUser, { status:200, statusText: 'ok' });
    httpMock.verify();   

    // This sync emits the event and the subscribe callback gets executed above
    submitEl.triggerEventHandler('click', null);

    // Now we can check to make sure the emitted value is correct
    expect(userData.email).toBe("assi.nguessan@free.fr");
    expect(userData.password).toBe("az12345");
    -------*/
  });

  it('Should logon on click event', () => {
    const fixture = TestBed.createComponent(UserLoginComponent);
    fixture.detectChanges();

    component.fc_email.setValue('anguessan@free.fr');
    component.fc_password.setValue('az12345');

    const okButton = fixture.debugElement.query(By.css('button'));
    okButton.triggerEventHandler('click', { email:'assi', password:'az12345'});
    
    fixture.detectChanges();

    component.getUser();
    //console.log("@@ RETURNED user ID="+JSON.stringify(component.user));
    expect(component.user).toBeDefined();
    expect(component.user.id).toEqual('');
  });
 /*
  it('Should logon on click event by spy', fakeAsync(() => {
    //spyOn(spyRestService, 'getUser').and.returnValue(of(mockOutputUser));
    spyRestService.getUser.and.returnValue(of(mockOutputUser));

    const fixture = TestBed.createComponent(UserLoginComponent);
    fixture.detectChanges();

    //flush();

    expect(spyRestService.getUser).toHaveBeenCalledWith(mockOutputUser);
    console.log('????? USER ID='+component.user);
    //expect(spyRestService.getUser).toHaveBeenCalled();

  }));
*/  

});
