import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';

@NgModule({
  declarations: [
    PessoasCadastroComponent,
    PessoasPesquisaComponent
  ],
  imports: [
    SharedModule,
    PessoasRoutingModule
  ]
})
export class PessoasModule { }
