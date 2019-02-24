import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  private loadCount = 0;

  get showLoad() {
    return Boolean(this.loadCount > 0);
  }

  public show(options?) {
    setTimeout(() => {
      this.loadCount++;
    }, 0.00001);
    if (options) {
      setTimeout(() => {
        this.loadCount--;
      }, options.timeout);
    }
  }

  public dismiss() {
    this.loadCount--;
  }
}
