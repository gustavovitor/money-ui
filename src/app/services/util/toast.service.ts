import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast: MessageService) { }

  success(msg: string) {
    this.toast.add({
      severity: 'success',
      summary: 'Deu certo!',
      detail: msg,
      life: 10000,
      closable: true,
    });
  }

  warning(msg: string) {
    this.toast.add({
      severity: 'warn',
      summary: 'Opa, olha lá!',
      detail: msg,
      life: 10000,
      closable: true,
    });
  }

  error(msg: string) {
    this.toast.add({
      severity: 'error',
      summary: 'Tentei, mas não consegui!',
      detail: msg,
      life: 10000,
      closable: true,
    });
  }
}
