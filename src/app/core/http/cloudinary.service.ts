import * as sha256 from 'crypto-js/sha256';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '@environments/environment';

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
    const c = environment.cloudinary;
    // https://cloudinary.com/documentation/upload_images#generating_authentication_signatures
    const eager = 'w_720';
    const eagerAsync = true;
    const timestamp = new Date().getTime();
    // Sort all the parameters in alphabetical order.
    const signature = `eager=${eager}&folder=${c.folder}&timestamp=${timestamp}${c.apiSecret}`;
    const formData = new FormData();
    formData.set('api_key', c.apiKey);
    formData.set('eager-async', `${eagerAsync}`);
    formData.set('eager', eager);
    formData.set('file', file);
    formData.set('folder', c.folder);
    formData.set('timestamp', `${timestamp}`);
    formData.set('signature', sha256(signature));
    const request = new HttpRequest(
      'POST',
        c.uploadUrl,
      formData,
      this.httpRequestOptions
    );
    return this.http.request(request);
  }
}
