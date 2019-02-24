import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  template: `
    <div class="container">
      <h1>Acesso negado!</h1>
    </div>
  `,
  styles: []
})
export class ForbiddenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
