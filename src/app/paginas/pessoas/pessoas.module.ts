import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from "@angular/forms";

import {
  ButtonModule, CalendarModule,
  DataTableModule,
  DropdownModule, InputMaskModule, InputSwitchModule, InputTextareaModule,
  InputTextModule,
  SelectButtonModule,
  TooltipModule
} from "primeng/primeng";
import { TableModule } from "primeng/table";
import { CurrencyMaskModule } from "ng2-currency-mask"

import { SharedModule } from "../../shared/shared.module";
import { LogService } from "../../services/util/log.service";
import { PessoaService } from "../../services/pessoas/pessoa.service";
import { PessoasRoutingModule } from "./pessoas-routing.module";
import { PessoasCadastroComponent } from "./pessoas-cadastro/pessoas-cadastro.component";
import { PessoasGridComponent } from "./pessoas-grid/pessoas-grid.component";
import { PessoasPesquisaComponent } from "./pessoas-pesquisa/pessoas-pesquisa.component";

@NgModule({
  declarations: [
    PessoasCadastroComponent,
    PessoasGridComponent,
    PessoasPesquisaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

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
    InputMaskModule,
    InputSwitchModule,

    SharedModule,
    PessoasRoutingModule
  ]
})
export class PessoasModule { }
