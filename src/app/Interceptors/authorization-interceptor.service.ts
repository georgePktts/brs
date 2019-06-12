import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpSentEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()

export class AuthorizationInterceptor implements HttpInterceptor {


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    req = req.clone({setHeaders: {Authorization: 'code.hub.ng5.token'}});

    return next.handle(req).pipe( map((event: HttpEvent<any>) => {
      console.log('event:' + event);
      return event;
    }));
  }
}
