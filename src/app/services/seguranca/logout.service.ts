import { Injectable } from '@angular/core';
import { MoneyHttp } from './money-http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: MoneyHttp,
              private router: Router) { }

  URL = 'http://localhost:8080/token/revoke';

  logout() {
    this.http.delete(this.URL).toPromise()
      .then(() => {
        this.router.navigate(['/auth']);
      })
      .catch(() => null);
  }
}
