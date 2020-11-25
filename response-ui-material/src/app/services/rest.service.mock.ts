import { of, Observable } from 'rxjs';
import { UserModel } from '../model/user.model';

const mockOutputUser = 
  { id:'',firstName:'Assi', lastName: 'Nguessan', address:'15 bld Gouvion St Cyr', 
    gender: 1, password:'az12345', email:'assi.nguessan@free.fr', birthDate:'01/04/1964' 
  };

/**
 * Mock of rest.service.ts
 */
export class MockRestService {

      /**
   * Get a user
   * @param userData
   */
  getUser(userData: UserModel): Observable<any> {
    console.log("%% USER data: ",JSON.stringify(userData));
    /*
      return this.http.get<any>(endpoint + 'getuser/'+userData.email+'/'+userData.password, httpOptions).pipe(
      tap((user) => {this.currentUser = user; console.log(`user found w/ id=${user.id}`)}),
      catchError(this.handleError<any>('getUser'))
    );
    */
        return of(mockOutputUser);
  }

    /**
   * Load all user
   */
  loadUsers(): Observable<any> {
    console.log("%% LOAD USERS ...");
    /*
      return this.http.get<any>(endpoint + 'loadUsers/', httpOptions).pipe(
      tap((users) => {this.selectedUsers = users; console.log(`users selected w/ id=${users}`)
      }),
      catchError(this.handleError<any>('getUser'))
    );
    */
   return of([]);

  }  
}