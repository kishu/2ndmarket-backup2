import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  protected httpRequestOptions = {
    headers: new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest'
    }),
    reportProgress: true
  };

  constructor(private http: HttpClient) {
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const url = 'https://api.cloudinary.com/v1_1/dhtyfa1la/image/upload';
    const formData = new FormData();
    formData.set('file', file);
    formData.set('upload_preset', '2ndmarket-dev');
    const request = new HttpRequest(
      'POST',
      url,
      formData,
      this.httpRequestOptions
    );
    return this.http.request(request);
  }
}
