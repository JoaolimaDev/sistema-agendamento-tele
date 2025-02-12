import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const securityGuardGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);
  const apiUrl = 'http://localhost:8080/contato?page=0&size=1';

  return http.get(apiUrl, { observe: 'response', withCredentials: true }).pipe(
    map((response: HttpResponse<any>) => {
     
      return response.status === 200;
      
    }),
    catchError((error) => {

      router.navigate(['/login']);
      return of(false);
    })
  );
};
