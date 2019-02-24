import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, from as observableFromPromise } from 'rxjs';
import { LoadingService } from '../util/loading.service';

export class NotAuthenticatedError {}

@Injectable()
export class MoneyHttp extends HttpClient {
  constructor(private auth: AuthService,
              private httpHandler: HttpHandler,
              private loading: LoadingService) {
    super(httpHandler);
  }

  delete<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.delete<T>(url, options));
  }

  get<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.get<T>(url, options));
  }

  head<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.head<T>(url, options));
  }

  options<T>(url: string, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.options<T>(url, options));
  }

  patch<T>(url: string, body: any | null, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.patch<T>(url, body, options));
  }

  post<T>(url: string, body: any | null, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.post<T>(url, body, options));
  }

  put<T>(url: string, body: any | null, options?: any): Observable<T> {
    return this.fazerRequisicao<T>(() => super.put<T>(url, body, options));
  }

  private fazerRequisicao<T>(func: Function): Observable<T> {
    this.loading.show();
    if (this.auth.isAccessTokenInvalid()) {
      console.log('Requisição com chave inválida, obtendo uma nova chave.');

      const chamadaNovoAccessToken = this.auth.obterNovoAccessToken()
        .then(() => {
          if (this.auth.isAccessTokenInvalid()) {
            throw new NotAuthenticatedError();
          }
          return func().toPromise()
            .then(data => {
              this.loading.dismiss();
              return Promise.resolve(data);
            })
            .catch(err => {
              this.loading.dismiss();
              return Promise.reject(err);
            });
        });

      return observableFromPromise(chamadaNovoAccessToken);
    } else {
      return observableFromPromise(func().toPromise()
        .then(data => {
          this.loading.dismiss();
          return Promise.resolve(data);
        })
        .catch(err => {
          this.loading.dismiss();
          return Promise.reject(err);
        }));
    }
  }
}
