import {Inject, Injectable} from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class LogService {

  constructor(
    @Inject('LogPrefix') private prefix: string
  ) {}

  msg(msg: string) {
    if (environment.production) {
      return;
    }
    console.log(`${this.prefix}: ${msg}`);
  }
}
