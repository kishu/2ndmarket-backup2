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
    const eager = 'f_auto,q_auto,w_700,dpr_2.0,c_limit';
    const eagerAsync = true;
    const timestamp = new Date().getTime();
    // Sort all the parameters in alphabetical order.
    const signature = `eager=${eager}&folder=${c.folder}&timestamp=${timestamp}${c.apiSecret}`;
    const fd = new FormData();
    fd.set('api_key', c.apiKey);
    fd.set('eager-async', `${eagerAsync}`);
    fd.set('eager', eager);
    fd.set('file', file);
    fd.set('folder', c.folder);
    fd.set('timestamp', `${timestamp}`);
    fd.set('signature', sha256(signature));
    const request = new HttpRequest('POST', c.url, fd, this.httpRequestOptions);
    return this.http.request(request);
  }
}
