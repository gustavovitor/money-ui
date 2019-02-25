import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioLogin } from '../../core/model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoadingService } from '../util/loading.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL = environment.WebServiceList.URLAuth;

  jwtPayload: any;

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService,
              private loading: LoadingService) {
    this.carregarToken();
  }

  login(user: UsuarioLogin): Promise<void> {
    this.loading.show();
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic b2F1dGgyLWNsaWVudC1hcGk6KlkqJWJYUSM8NSxwfltWazliYiYmWDlyc3c3Vn5KYF8=');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${user.email}&password=${user.senha}&grant_type=password`;
    return this.http.post<any>(this.URL, body, { headers, withCredentials: true }).toPromise()
      .then(res => {
        this.loading.dismiss();
        this.armazenarToken(res.access_token);
      })
      .catch(err => {
        this.loading.dismiss();
        if (err.status === 400) {
          if (err.error.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }
        }
        return Promise.reject(err);
      });
  }

  obterNovoAccessToken(): Promise<void> {
    this.loading.show();
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic b2F1dGgyLWNsaWVudC1hcGk6KlkqJWJYUSM8NSxwfltWazliYiYmWDlyc3c3Vn5KYF8=');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=refresh_token';

    return this.http.post<any>(this.URL, body, { headers, withCredentials: true }).toPromise()
      .then(res => {
        this.armazenarToken(res.access_token);
        this.loading.dismiss();
        return Promise.resolve(null);
      })
      .catch(err => {
        this.loading.dismiss();
        return Promise.reject(null);
      });
  }

  isAccessTokenInvalid() {
    const token = localStorage.getItem('access_token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  hasAuthority(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  hasAnyAuthority(roles) {
    for (const role of roles) {
      if (this.hasAuthority(role)) {
        return true;
      }
    }
    return false;
  }

  public clearToken() {
    localStorage.removeItem('access_token');
    this.jwtPayload = null;
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('access_token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('access_token');

    if (token) {
      this.armazenarToken(token);
    }
  }
}
