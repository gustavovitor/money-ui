import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LancamentoPesquisaComponent } from './lancamento-pesquisa/lancamento-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos-cadastro/lancamento-cadastro.component';
import { AuthGuard } from '../../services/seguranca/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LancamentoPesquisaComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_PESQUISAR_LANCAMENTO'],
      state: 'lancamentoPesquisa'
    }
  },
  {
    path: 'novo',
    component: LancamentoCadastroComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CADASTRAR_LANCAMENTO'],
      state: 'lancamentoCadastro'
    }
  },
  {
    path: ':id',
    component: LancamentoCadastroComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CADASTRAR_LANCAMENTO'],
      state: 'lancamentoCadastro'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }
