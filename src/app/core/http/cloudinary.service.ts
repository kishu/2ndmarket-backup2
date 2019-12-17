import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

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

  upload(files: File[]) {
    let totalFileSize = 0;
    const httpRequests = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      totalFileSize = totalFileSize + file.size;
      const httpRequest = new HttpRequest(
        'POST',
        this.cloudinary.uploadURL,
        new FormData().set('file', file),
        this.httpRequestOptions
      );
      httpRequests.push(httpRequest);
    }
  }
}
