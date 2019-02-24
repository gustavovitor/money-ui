import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LogService } from '../../../services/util/log.service';
import { PaginatorProperties } from '../../../shared/paginator-properties.class';
import { AuthService } from '../../../services/seguranca/auth.service';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent implements OnInit {

  cols = [
    { field: 'nome', header: 'Nome', styleClass: '' },
    { field: 'endereco', subfield: 'cidade', header: 'Cidade', styleClass: '' },
    { field: 'endereco', subfield: 'estado', header: 'Estado', styleClass: '' },
    { field: 'ativo', header: 'Status', styleClass: 'col-data centralizar' }
  ];

  @Input() paginatorProperties: PaginatorProperties;
  @Input() pessoas: any;

  @Output() aoMudarPagina = new EventEmitter();
  @Output() aoExcluir = new EventEmitter();
  @Output() aoEditar = new EventEmitter();
  @Output() onChangeStatus = new EventEmitter();

  executarEvento(event) {
    this.aoMudarPagina.emit(event);
  }

  executarAoExcluir(pessoa) {
    this.aoExcluir.emit(pessoa);
  }

  executarAoEditar(pessoa) {
    this.aoEditar.emit(pessoa);
  }

  executarAoMudarFlag(pessoa) {
    this.onChangeStatus.emit(pessoa);
  }

  constructor(private log: LogService,
              public auth: AuthService) { }

  ngOnInit() {
    this.log.msg('Inicialização da grid de pessoas concluída.');
  }

}
