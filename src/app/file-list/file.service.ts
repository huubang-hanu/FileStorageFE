import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { File } from './file.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseURL = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getFiles(): Observable<File[]>{
    return this.http.get<File[]>(`${this.baseURL}/api/files`);
  }
  uploadFile(){}

  downloadFile(){}

  
}
