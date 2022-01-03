import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomeFile } from './file.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseURL = 'http://localhost:8080/api/files';
  constructor(private http: HttpClient) { }

  getFiles(): Observable<CustomeFile[]>{
    return this.http.get<CustomeFile[]>(`${this.baseURL}`);
  }
  uploadFile(formData: FormData): Observable<HttpEvent<string>>{
    return this.http.post<string>(`${this.baseURL}/upload`, formData,{
      reportProgress: true,
      observe: 'events'
    })
  }

  downloadFile(filename: string, fileVersionId: number): Observable<HttpEvent<Blob>>{
    return this.http.get(`${this.baseURL}/download/${filename}/${fileVersionId}`,{
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    })
  }

  deleteFile(filename: string, fileVersionId: number): Observable<Object>{
    return this.http.delete(`${this.baseURL}/delete/${filename}/${fileVersionId}`);
  }

  
}
