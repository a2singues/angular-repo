import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent, HttpParams, HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { RestService } from '../services/rest.service';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient, public rest:RestService) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('user', "assi");
  
    const req = new HttpRequest('POST', `${this.rest.getEndpoint()}upload`, formData, {
      reportProgress: true,
      responseType: 'text'
    });

    //req.headers.append('Access-Control-Allow-Origin','http://localhost:4001');
    //req.headers.append('Origin','http://localhost:3300');

    return this.http.request(req);
  }

  getFiles(nickname): Observable<any> {
    console.log('@ [UPLOAD-SERV] getFiles: user = '+nickname);
    const formData: FormData = new FormData();

    let prms = new HttpParams();
    prms = prms.append('user', nickname);
/*
    const req = new HttpRequest('GET', `${this.rest.getEndpoint()}files`,{params: prms});

    //req.headers.append('user',nickname);
    let fileInfos: any;
    this.http.request(req).subscribe(httpResponse => {
      hEvent: HttpEvent;
      console.log('@ [UPLOAD-SERV] Response: '+JSON.stringify(httpResponse.body));
      return httpResponse.body;
    });
    
/*
    this.http.request(req).pipe(
      tap((fInfos) => {fileInfos = fInfos; console.log(`files.infos=${fInfos}`)
      }),
      catchError(this.handleError<any>('getFiles'))
    );
*
    console.log('@ [UPLOAD-SERV] ================================================================== fileInfos='+JSON.stringify(fileInfos));
    //return this.http.request(req);
    return fileInfos;
*/

    return this.http.get(`${this.rest.getEndpoint()}files`, {params: prms});
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
//      console.log("*** USER ERROR="+JSON.stringify(this.userError)); // log to console instead
      return throwError("getFiles error");
      //return throwError(JSON.stringify(error));
    };
  }  
  
}