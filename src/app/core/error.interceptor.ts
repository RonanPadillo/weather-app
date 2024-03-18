import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  
  return next(req).pipe(
    catchError((e) => {

      if([404].includes(e.status)) {
        console.log("City no found")
      }
      const error = e.error?.message || e.statusText;
      return throwError(()=> error)
    })
  );
};
