import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IContact } from '../models/IContact';
import { catchError } from 'rxjs/operators';
import { IGroup } from '../models/IGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private serverUrl:string= `http://localhost:9005`;

  constructor(private httpClient: HttpClient) { }

  public getAllContacts():Observable<IContact[]>{
    let dataURL:string= `${this.serverUrl}/contacts`;
    return this.httpClient.get<IContact[]>(dataURL).pipe(catchError(this.handleError))
  }

  public getContact(contactId:string): Observable<IContact[]>{
    let dataURL:string= `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.get<IContact[]>(dataURL).pipe(catchError(this.handleError))
  }

  public createContact(contact:IContact):Observable<IContact>{
    let dataURL:string= `${this.serverUrl}/contacts`;
    return this.httpClient.post<IContact>(dataURL, contact).pipe(catchError(this.handleError))
  }

  public updateContact(contact:IContact, contactId:string):Observable<IContact>{
    let dataURL:string= `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.put<IContact>(dataURL, contact).pipe(catchError(this.handleError))
  }

  public deleteContact(contactId:string):Observable<{}>{
    let dataURL:string= `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.delete<{}>(dataURL).pipe(catchError(this.handleError))
  }

  public getAllGroups():Observable<IGroup[]>{
    let dataURL:string= `${this.serverUrl}/groups`;
    return this.httpClient.get<IGroup[]>(dataURL).pipe(catchError(this.handleError))
  }

  public getGroup(contact:any):Observable<IGroup>{
    let dataURL:string= `${this.serverUrl}/groups/${contact.groupId}`;
    return this.httpClient.get<IGroup>(dataURL).pipe(catchError(this.handleError))
  }

  

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}


