import {Component, OnInit, ViewChild} from '@angular/core';
import {LancamentoFiltro, LancamentoService} from '../../../services/lancamentos/lancamento.service';
import {PaginatorProperties} from '../../../shared/paginator-properties.class';
import {ConfirmationService, LazyLoadEvent} from 'primeng/api';
import {ErrorHandlerService} from '../../../core/error-handler.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import { AuthService } from '../../../services/seguranca/auth.service';
import { ToastService } from '../../../services/util/toast.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Action } from '../../../shared/grid/grid.component';

@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent implements OnInit {

  constructor(private lancamentoService: LancamentoService,
              private toasty: ToastService,
              private confirmationService: ConfirmationService,
              private error: ErrorHandlerService,
              private router: Router,
              private title: Title,
              public auth: AuthService,
              private currencyPipe: CurrencyPipe,
              private datePipe: DatePipe
              ) {}

  filtro = new LancamentoFiltro();
  paginatorProperties = new PaginatorProperties();
  @ViewChild('tabela') grid;

  cols = [
    { field: 'pessoa', header: 'Pessoa', styleClass: ['col-20'] },
    { field: 'descricao', header: 'Descrição', styleClass: ['col-40'] },
    { field: 'dataVencimento', header: 'Vencimento', styleClass: ['col-10'], type: this.datePipe, paramx: 'dd/MM/y' },
    { field: 'dataPagamento', header: 'Pagamento', styleClass: ['col-10'], type: this.datePipe, paramx: 'dd/MM/y' },
    { field: 'valor', header: 'Valor', styleClass: ['col-10'], type: this.currencyPipe, paramx: 'BRL', paramy: 'symbol' }
  ];

  actions: Action[] = [
    {
      key: 1,
      icon: 'fa fa-edit',
      tooltip: 'Editar lancamento..',
      disabled: !this.auth.hasAuthority('ROLE_CADASTRAR_LANCAMENTO')
    },
    {
      key: 2,
      icon: 'fa fa-trash',
      tooltip: 'Excluir lancamento..',
      disabled: !this.auth.hasAuthority('ROLE_REMOVER_LANCAMENTO')
    }
  ];

  valor: any;

  lancamentos = [];

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Lançamentos');
  }

  filtrarEventos(e) {
    switch (e.key) {
      case 1:
        this.aoEditar(e.date);
        break;
      case 2:
        this.aoExcluir(e.date);
        break;
    }
  }

  aoMudarPagina(event) {
    const page = event.first / event.rows;
    this.pesquisar(page);
  }

  pesquisar(page = 0) {
    this.filtro.page = page;
    this.lancamentoService.pesquisar(this.filtro)
      .then(result => {
        this.paginatorProperties.totalRecords = result.total;
        this.lancamentos = result.lancamentos;
      })
      .catch(err => {
        this.error.handler(err);
      });
  }

  aoEditar(lancamento: any) {
    this.router.navigate(['/lancamentos', lancamento.codigo]);
  }

  aoExcluir(lancamento: any) {
    this.confirmationService.confirm({
      header: 'Opa, pera lá..',
      icon: 'fa fa-question',
      message: 'Deseja realmente excluir este lançamento?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        this.pesquisar(this.filtro.page);
        this.toasty.success('Lancamento excluído com sucesso!');
      })
      .catch(err => {
        this.error.handler(err);
    });
  }

}
