import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  if(req.url.indexOf("Auth") > 0)
    return next(req);

  const token = localStorage.getItem("token");
  const reqClon = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(reqClon);
};
