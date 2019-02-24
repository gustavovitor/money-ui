import { Component, OnInit } from '@angular/core';
import { UsuarioLogin } from "../../../core/model";
import {AuthService} from "../../../services/seguranca/auth.service";
import {ErrorHandlerService} from "../../../core/error-handler.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private auth: AuthService,
              private error: ErrorHandlerService,
              private router: Router) { }

  ngOnInit() {
  }

  user = new UsuarioLogin();

  login() {
    this.auth.login(this.user)
      .then(() => {
        this.router.navigate(['/lancamentos']);
      })
      .catch(err => {
        this.error.handler(err);
      });
  }

}
