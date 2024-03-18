import { HttpContextToken, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, tap } from 'rxjs';

export const CACHING_ENABLED = new HttpContextToken<boolean>(() => true);

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.method !== 'GET' || !CACHING_ENABLED) {
    return next(req);
  }

  const cachedResponse = cacheMap.get(req.url);
  if (cachedResponse) {
    return of(cachedResponse.clone());
  }

  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        cacheMap.set(req.url, event.clone());
      }
    })
  );
};

const cacheMap = new Map<string, HttpResponse<unknown>>