import {Inject, Injectable} from '@angular/core';

@Injectable()
export class LogService {

  constructor(
    @Inject('LogPrefix') private prefix: string
  ) {}

  msg(msg: string) {
    console.log(`${this.prefix}: ${msg}`);
  }
}
