import { NgModule } from '@angular/core';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    SharedModule,
    SegurancaRoutingModule
  ],
  providers: []
})
export class SegurancaModule { }
