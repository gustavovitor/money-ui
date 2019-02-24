import { Injectable } from '@angular/core';
import { MoneyHttp } from './money-http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: MoneyHttp,
              private router: Router,
              private auth: AuthService) { }

  URL = environment.WebServiceList.URLLogout;

  logout() {
    this.http.delete(this.URL, { withCredentials: true }).toPromise()
      .then(() => {
        this.auth.clearToken();
        this.router.navigate(['/auth']);
      })
      .catch(() => null);
  }
}
