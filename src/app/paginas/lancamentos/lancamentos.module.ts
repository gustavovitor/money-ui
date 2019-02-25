import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LancamentoCadastroComponent } from './lancamentos-cadastro/lancamento-cadastro.component';
import { LancamentoPesquisaComponent } from './lancamento-pesquisa/lancamento-pesquisa.component';
import { LancamentosGridComponent } from './lancamentos-grid/lancamentos-grid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonModule, CalendarModule,
  DataTableModule,
  DropdownModule, InputTextareaModule,
  InputTextModule,
  SelectButtonModule,
  TooltipModule
} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {SharedModule} from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import {LancamentosRoutingModule} from './lancamentos-routing.module';

@NgModule({
  declarations: [
    LancamentoCadastroComponent,
    LancamentoPesquisaComponent,
    LancamentosGridComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,

    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DataTableModule,
    TableModule,
    TooltipModule,
    DropdownModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    CurrencyMaskModule,

    SharedModule,
    LancamentosRoutingModule
  ],
  exports: []
})
export class LancamentosModule { }
