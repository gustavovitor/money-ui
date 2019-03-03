import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotAuthenticatedError } from '../services/seguranca/money-http';
import { Router } from '@angular/router';
import { ToastService } from '../services/util/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toasty: ToastService,
              private router: Router) { }

  handler(err: any) {
    console.error(err);
    let msg: string;
    if (typeof err === 'string') {
      msg = err;
    } else if (err instanceof NotAuthenticatedError) {
      msg = 'Sua sessão expirou!';
      this.router.navigate(['/auth']);
    } else if (err instanceof HttpErrorResponse && err.status >= 400 && err.status <= 499) {

      if (err.status === 403) {
        msg = 'Você não tem permissão para isso.';
      }

      try {
        msg = err.error[0].message;
      } catch (e) { }
    } else {
      msg = 'Erro ao processar o serviço remoto.';
    }

    this.toasty.error(msg);
  }

}
