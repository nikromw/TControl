import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { STORE_API_URL } from '../app-injection-tokens';
import { SettingParam } from '../models/settingParam';

@Injectable({
  providedIn: 'root'
})
export class NoteSettingServiceService {


  private baseApiUrl = `${this.apiUrl}api/`;

  constructor(private http: HttpClient, @Inject(STORE_API_URL) private apiUrl:string) { }

  createSetting(setting: any):any{
      return this.http.get(`${this.baseApiUrl}NoteSetting/createSetting?settingName=${setting}`)
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  createSettingParam(paramValue: string, settingId: number):any{
    return this.http.get(`${this.baseApiUrl}NoteSetting/createSettingParam?settingParamValue=${paramValue}&settingId=${settingId}`)
    .subscribe((response: any) => {
      console.log(response);
    });
}

  geSettingtList():Observable<string[]>{
    return this.http.get<string[]>(`${this.baseApiUrl}NoteSetting/getNoteSettingsList`);
  }

  
  geSettingParamtList():Observable<SettingParam[]>{
    return this.http.get<SettingParam[]>(`${this.baseApiUrl}NoteSetting/GetSettingsParamList`);
  }
}
