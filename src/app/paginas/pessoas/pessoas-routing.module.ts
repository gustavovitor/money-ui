import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { AuthGuard } from '../../services/seguranca/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PessoasPesquisaComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_PESQUISAR_PESSOA'],
      state: 'pessoasPesquisa'
    }
  },
  {
    path: 'novo',
    component: PessoasCadastroComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CADASTRAR_PESSOA'],
      state: 'pessoasCadastro'
    }
  },
  {
    path: ':id',
    component: PessoasCadastroComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CADASTRAR_PESSOA'],
      state: 'pessoasCadastro'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PessoasRoutingModule { }
