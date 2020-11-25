import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { UserHomeComponent } from './user-home.component';

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
import { RestService } from '../rest.service';

describe('UserHomeComponent', () => {
  let component: UserHomeComponent;
  let fixture: ComponentFixture<UserHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
      declarations: [ UserHomeComponent ],
      providers: [RestService, HttpTestingController],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    console.log("*** Init component 1="+component+" ***");
    fixture = TestBed.createComponent(UserHomeComponent);
    console.log("*** Init fixture 10="+fixture+" ***");
    component = fixture.componentInstance;
    console.log("*** Init component 11="+component+" ***");
    fixture.detectChanges();
    component.ngOnInit();
    console.log("*** Init component 2="+component+" ***");
  }));
/*
  beforeEach(() => {
    fixture = TestBed.createComponent(UserHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
*/

  it('should create', () => {
    console.log("*** Component="+component+" ***");
    expect(component).toBeTruthy();
  });
});
