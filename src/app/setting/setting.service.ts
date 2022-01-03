import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Setting } from './setting.model';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private baseURL = 'http://localhost:8080/api/setting';

  constructor(private http: HttpClient) { }

  getSetting():Observable<Setting> {
    return this.http.get<Setting>(`${this.baseURL}/1`);
  }

  updateSetting(setting: Setting):Observable<Setting>{
    return this.http.put<Setting>(`${this.baseURL}/update/1`, setting);
  }
}
