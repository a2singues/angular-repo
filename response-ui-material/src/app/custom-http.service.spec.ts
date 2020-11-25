import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
 
import { CustomHttpService } from './custom-http.service';
import { RestService } from './services/rest.service';
  
const endpoint = 'http://localhost:8080/api/v1/';

const mockUsersList = [
    { id:'',firstName:'Assi', lastName: 'Nguessan', address:'15 bld Gouvion St Cyr', 
      gender: 1, password:'az12345', email:'assi.nguessan@free.fr', birthDate:'01/04/1964' 
    },
    { id:'',firstName:'Ghislain', lastName: 'Nguessan', address:'15 bld Gouvion St Cyr', 
      gender: 1, password:'az12345', email:'nghis@free.fr', birthDate:'05/09/1997' 
    }
  ];

describe('CustomHttpService', () => {
  let service: CustomHttpService;
  let restService: RestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [CustomHttpService, RestService]
    });

    // inject the service
    service = TestBed.get(CustomHttpService);
    restService = TestBed.get(RestService);
    httpMock = TestBed.get(HttpTestingController);
  });  


  it('should get the correct star wars character', () => {
    service.getSingle(1).subscribe((data: any) => {
      expect(data.name).toBe('Luke Skywalker');
    });

    const req = httpMock.expectOne(`http://replace.with.api/anything/1`, 'call to api');
    expect(req.request.method).toBe('GET');

    req.flush({
        name: 'Luke Skywalker'
      });
  
    httpMock.verify();

  });

  it('should load users', () => {
    restService.loadUsers().subscribe( (users: any) => {
        expect(users).not.toBeNull();
        expect(users.length).toEqual(2);
     });

    const req = httpMock.expectOne({
        url: endpoint + 'loadUsers/',
        method: 'GET'
      });
    req.flush(mockUsersList);
    httpMock.verify();   
  });

});