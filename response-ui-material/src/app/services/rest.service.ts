import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserModel } from '../model/user.model';
//import { UserErrorModel } from './model/userError.model';

enum Op {
  accueil,
  inscription,
  connection
}


const endpoint = 'http://localhost:8080/api/v1/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

/*
@Injectable({
  providedIn: 'root'
})
*/

@Injectable()
export class RestService {

  @Input() userError = { status:'', message:''};

  currentUser: UserModel;
  selectedUsers: UserModel[];
  currentOperation: String;

  //constructor(private http: HttpClient) { }
  constructor(private http: HttpClient, private router: Router) { }

      /**
   * Get endpoint
   */
  getEndpoint(): String {
      return endpoint ;
  }

  registerUser(user): Observable<any> {
    console.log("%% REGISTERED USER: ",user);
      return this.http.post<any>(endpoint + 'users', JSON.stringify(user), httpOptions).pipe(
      tap((user) => console.log(`added user w/ id=${user.id}`)),
      catchError(this.handleError<any>('addUser'))
    );
  }

  /**
   * Get a user
   * @param userData
   */
  getUser(userData): Observable<any> {
    console.log("%% USER data: ",JSON.stringify(userData));
      return this.http.get<any>(endpoint + 'getuser/'+userData.email+'/'+userData.password, httpOptions).pipe(
      tap((user) => {this.currentUser = user; console.log(`user found w/ id=${user.id}`)}),
      catchError(this.handleError<any>('getUser'))
    );
  }

    /**
   * Load all user
   */
  loadUsers(): Observable<any> {
    console.log("%% LOAD USERS ...");
      return this.http.get<any>(endpoint + 'loadUsers/', httpOptions).pipe(
      tap((users) => {this.selectedUsers = users; console.log(`users selected w/ id=${users}`)
      }),
      catchError(this.handleError<any>('getUser'))
    );
  }


  routeToHome(userData: UserModel): any {
    console.log('@@ USER LOGED: '+userData.lastName);
    this.router.navigate(['home']);
    /*
    return this.http.delete<any>(endpoint + 'products/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
    */
  }  

  /** 
   * Set the current user
   * @param currUser 
   */
  setCurrentUser(currUser: UserModel) {
    //console.log("======>>> setCurrentUser: user="+currUser);
    this.currentUser = currUser;
  }

  /** 
   * Set the current operation
   * @param oper 
   */
  setCurrentOperation(oper: String) {
    //console.log("======>>> setCurrentOp: OP="+oper);
    this.currentOperation = oper;
  }

  /**
   * Remove the current user
   */
  removeUser() {
    //console.log("======>>> removeUser ...");
    this.currentUser = null;
  }
    /** 
   * get the current user
   * @param currUser 
   */
  getCurrentUser() {
    //console.log("======>>> getCurrentUser: LOGGED user="+this.currentUser);
    return this.currentUser;
  }

  showCurrentUser(): Boolean {
      return (this.currentUser != null) && (this.currentUser !== undefined);
  }
  /**
   * Handling errors
   * @param operation 
   * @param result 
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error("*** ERREUR="+JSON.stringify(error)); // log to console instead
      console.log("*** Erreur status="+error.status); // log to console instead
      console.log("*** Erreur all="+JSON.stringify(error)); // log to console instead
      //console.log("*** Erreur message="+error.error.message); // log to console instead
    
      // TODO: better job of transforming error for user consumption
      //console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      //return of(error as T);
      this.userError.status = error.status;
      this.userError.message = error.message;

//      return throwError(error as T);
      console.log("*** USER ERROR="+JSON.stringify(this.userError)); // log to console instead
      return throwError(this.userError);
      //return throwError(JSON.stringify(error));
    };
  }  
  
}
