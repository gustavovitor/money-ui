import { NgModule } from '@angular/core';

import { LancamentoCadastroComponent } from './lancamentos-cadastro/lancamento-cadastro.component';
import { LancamentoPesquisaComponent } from './lancamento-pesquisa/lancamento-pesquisa.component';
import { SharedModule } from '../../shared/shared.module';
import { LancamentosRoutingModule } from './lancamentos-routing.module';

@NgModule({
  declarations: [
    LancamentoCadastroComponent,
    LancamentoPesquisaComponent
  ],
  imports: [
    SharedModule,
    LancamentosRoutingModule
  ],
  exports: []
})
export class LancamentosModule { }
