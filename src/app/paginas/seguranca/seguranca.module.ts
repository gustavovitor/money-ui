import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/primeng";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,

    HttpClientModule,
    ButtonModule,
    FormsModule,
    InputTextModule,

    SegurancaRoutingModule
  ],
  providers: []
})
export class SegurancaModule { }
