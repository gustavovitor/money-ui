import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './core/not-found.component';
import { ForbiddenComponent } from './core/forbidden.component';

const routes: Routes = [
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },

  { path: 'lancamentos', loadChildren: './paginas/lancamentos/lancamentos.module#LancamentosModule' },
  { path: 'pessoas', loadChildren: './paginas/pessoas/pessoas.module#PessoasModule' },
  { path: 'auth', loadChildren: './paginas/seguranca/seguranca.module#SegurancaModule' },

  { path: 'notfound', component: NotFoundComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', redirectTo: 'notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
