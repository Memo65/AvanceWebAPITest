import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem("token") || "";
  const router = inject(Router);
  const authService = inject(AuthService)

  if(token != ""){
    return authService.TokenValidation(token).pipe(
      map(data => {
        if(data.isSuccess){
          return true;
        }
        else {
          router.navigate(["login"]);
          return false;
        }
      }),catchError(error => {
        router.navigate(["login"]);
        console.log(error);
        return of(false);
      })
    )
  }
  else{
    router.navigateByUrl("login");
    return false;
  }

  
};
