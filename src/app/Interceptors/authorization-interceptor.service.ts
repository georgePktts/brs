import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpSentEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * Intercepts HttpRequest or HttpResponse and handles them.
 *
 * @export
 * @class AuthorizationInterceptor
 * @implements {HttpInterceptor}
 */
@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  /**
   * We set the header of the http request
   * so the backend can see that we are authorized users
   * @param {HttpRequest<any>} req req: The outgoing request to handle
   * @param {HttpHandler} next next: The next interceptor in the chain, or the backend if no interceptors in the chain.
   * @returns {Observable<HttpEvent<any>>} Union type for all possible events on the response stream
   * @memberof AuthorizationInterceptor
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    req = req.clone({setHeaders: {Authorization: 'code.hub.ng5.token'}});
    return next.handle(req).pipe( map((event: HttpEvent<any>) => {
      return event;
    }));
  }
}
