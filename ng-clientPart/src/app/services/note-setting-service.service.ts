import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { STORE_API_URL } from '../app-injection-tokens';

@Injectable({
  providedIn: 'root'
})
export class NoteSettingServiceService {


  private baseApiUrl = `${this.apiUrl}api/`;

  constructor(private http: HttpClient, @Inject(STORE_API_URL) private apiUrl:string) { }

  createSetting(setting: any):any{
      return this.http.get(`${this.baseApiUrl} NoteSetting/createNote` ,setting)
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  getList():Observable<string[]>{
    return this.http.get<string[]>(`${this.baseApiUrl} NoteSetting/getNoteSettingsList`);
  }
}
