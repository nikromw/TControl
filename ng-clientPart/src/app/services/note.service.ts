import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { STORE_API_URL } from '../app-injection-tokens';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private baseApiUrl = `${this.apiUrl}api/`;
  
  constructor(private http: HttpClient, @Inject(STORE_API_URL) private apiUrl:string) { }

  creteNote(note :Note):any {
    var body = JSON.stringify(note);
    const headers = { 'content-type': 'application/json'}  
    return this.http.post(`${this.baseApiUrl}Note/createNote?title=noteTitle&body=noteBody` ,body, {headers})
    .subscribe((response: any) => {
      console.log(response);
    });
  }
}
