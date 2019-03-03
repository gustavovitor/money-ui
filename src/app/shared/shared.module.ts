import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { MessageModule } from 'primeng/message';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonModule,
  CalendarModule,
  DataTableModule,
  DropdownModule, InputMaskModule, InputSwitchModule,
  InputTextareaModule,
  InputTextModule, SelectButtonModule,
  TooltipModule
} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { HttpClientModule } from '@angular/common/http';
import { GridComponent } from './grid/grid.component';

@NgModule({
  imports: [
    CommonModule,
    MessageModule,

    ButtonModule,
    TooltipModule,

    TableModule,
    DataTableModule
  ],
  declarations: [MessageComponent, GridComponent],
  exports: [
    CommonModule,
    HttpClientModule,

    MessageComponent,
    GridComponent,

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
    InputMaskModule,
    InputSwitchModule
  ]
})
export class SharedModule { }
