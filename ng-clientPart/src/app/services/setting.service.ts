import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { STORE_API_URL } from '../app-injection-tokens';
import { SettingParam } from '../models/settingParam';

@Injectable({
  providedIn: 'root'
})
export class NoteSettingService {


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

  geSettingtList():Observable<SettingParam[]>{
    return this.http.get<SettingParam[]>(`${this.baseApiUrl}NoteSetting/getNoteSettingsList`);
  }

  
  geSettingParamById(noteSettingId: number):Observable<SettingParam[]>{
    return this.http.get<SettingParam[]>(`${this.baseApiUrl}NoteSetting/getSettingsParamById?noteSettingId=${noteSettingId}`);
  }
  
  geSettingParamtList():Observable<SettingParam[]>{
    return this.http.get<SettingParam[]>(`${this.baseApiUrl}NoteSetting/getSettingsParamList`);
  }
}
