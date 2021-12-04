import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = sessionStorage.getItem('token') as string;

    if (token) {
      const newRequest: any = request.clone();

      newRequest.headers = request.headers.set('Authorization', `Bearer ${token}`);

      return next.handle(newRequest);
    } else {
      return next.handle(request);
    }
  }
}
