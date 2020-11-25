import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { RestService } from './rest.service';
//import { Injectable } from '@angular/core';

const endpoint = 'http://localhost:8080/api/v1/';

const mockUsersList = [
                        { id:'',firstName:'Assi', lastName: 'Nguessan', address:'15 bld Gouvion St Cyr', 
                          gender: 1, password:'az12345', email:'assi.nguessan@free.fr', birthDate:'01/04/1964' 
                        },
                        { id:'',firstName:'Ghislain', lastName: 'Nguessan', address:'15 bld Gouvion St Cyr', 
                          gender: 1, password:'az12345', email:'nghis@free.fr', birthDate:'05/09/1997' 
                        }
                      ];

describe('RestService', () => {
  //let service, http, backend;

  let http;
  //let backend;
  let service: RestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
                RouterTestingModule,
              ],
      providers: [RestService]
    });

    // inject the service
    service = TestBed.get(RestService);
    httpMock = TestBed.get(HttpTestingController);
  });

  /*
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule,
               RouterTestingModule,
            ],
    providers: [ RestService, HttpTestingController ]
  })
  );
*/

  /*
  beforeEach(inject([RestService, HttpClient, HttpTestingController], (
    serv: RestService,
    _h: HttpClient,
    _b: HttpTestingController
    ) => {
      service = serv;
      http = _h;
      backend = _b;
   }));

   afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
     httpMock.verify();
   }));
*/

/*
  it('should be created', () => {
    const service: RestService = TestBed.get(RestService);
    expect(service).toBeTruthy();
  });
*/

it('should load users', () => {

  //---Appel du service
  service.loadUsers().subscribe(res => {
    expect(res).toBe(mockUsersList);
  });

  const req = httpMock.expectOne({
    url: endpoint+'loadUsers/',
    method: 'GET'
  });

  req.flush(mockUsersList, { status:200, statusText: 'ok' });

});

 /*
 it('should load users', () => {
  service.loadUsers().subscribe(res => {
    expect(res).toBe('[]');
  });

  const req = backend.expectOne({
    url: service.endpoint+'loadUsers/',
    method: 'GET'
  });

  req.flush('[]', { status:200, statusText: 'ok' });

  });
*/

/**
 * After tests
 */
afterAll(() => {
  TestBed.resetTestingModule();
});

});

