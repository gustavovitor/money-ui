import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { PaginatorProperties } from '../../../shared/paginator-properties.class';
import { AuthService } from '../../../services/seguranca/auth.service';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent implements OnInit {

  cols = [
    { field: 'pessoa', header: 'Pessoa', styleClass: '' },
    { field: 'descricao', header: 'Descrição', styleClass: '' },
    { field: 'dataVencimento', header: 'Vencimento', styleClass: ['col-data'], type: this.datePipe, paramx: 'dd/MM/y' },
    { field: 'dataPagamento', header: 'Pagamento', styleClass: ['col-data'], type: this.datePipe, paramx: 'dd/MM/y' },
    { field: 'valor', header: 'Valor', styleClass: ['col-valor'], type: this.currencyPipe, paramx: 'BRL', paramy: 'symbol' }
  ];

  @Input() paginatorProperties: PaginatorProperties;
  @Input() lancamentos: any;

  @Output() aoMudarPagina = new EventEmitter();

  @Output() aoExcluir = new EventEmitter();
  @Output() aoEditar = new EventEmitter();

  executarEvento(event){
    this.aoMudarPagina.emit(event);
  }

  executarAoExcluir(lancamento) {
    this.aoExcluir.emit(lancamento);
  }

  executarAoEditar(lancamento) {
    this.aoEditar.emit(lancamento);
  }

  constructor(private currencyPipe: CurrencyPipe,
              private datePipe: DatePipe,
              public auth: AuthService) {}

  ngOnInit() {}

}
