import { forkJoin, Subject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpProgressEvent, HttpRequest } from '@angular/common/http';

interface UploadProgress {
  loaded: number;
  total: number;
}

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

  upload(files: File[]): Subject<UploadProgress> {
    const progress$ = new Subject<UploadProgress>();
    let totalFileSize = 0;
    const httpRequests = [];
    files.forEach(file => {
      totalFileSize = totalFileSize + file.size;
      const httpRequest = new HttpRequest(
        'POST',
        'https://res.cloudinary.com/dhtyfa1la/image/twitter_name/',
        new FormData().set('file', file),
        this.httpRequestOptions
      );
      httpRequests.push(httpRequest);
    });
    httpRequests.forEach(req => {
      this.http.request(req).pipe(
        filter(e => e.type === HttpEventType.UploadProgress),
        tap((e: HttpProgressEvent) => {
          progress$.next({
            loaded: e.loaded,
            total: totalFileSize
          });
        })
      );
    });
    forkJoin(httpRequests).subscribe(r => {
      progress$.complete();
    });
    return progress$;
  }
}
