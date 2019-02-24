import {Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
    <div *ngIf="hasError()" style="margin-top: 12px;">
        <p-message [text]="text" severity="error"></p-message>
    </div>
  `
})
export class MessageComponent {

  @Input() text: string;
  @Input() error: string;
  @Input() control: FormControl;

  hasError() {
    return this.control.hasError(this.error) && this.control.dirty;
  }

}
