import {Component, OnInit} from '@angular/core';
import {PessoaFiltro, PessoaService} from '../../../services/pessoas/pessoa.service';
import {PaginatorProperties} from '../../../shared/paginator-properties.class';
import {ConfirmationService, LazyLoadEvent} from 'primeng/api';
import {ErrorHandlerService} from '../../../core/error-handler.service';
import {Router} from '@angular/router';
import { AuthService } from '../../../services/seguranca/auth.service';
import { ToastService } from '../../../services/util/toast.service';
import { Action } from '../../../shared/grid/grid.component';

@Component({
  selector: 'app-pesquisa-pessoas',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  paginatorProperties = new PaginatorProperties();
  filtro = new PessoaFiltro();

  constructor(private pessoaService: PessoaService,
              private confirmationService: ConfirmationService,
              private toasty: ToastService,
              private error: ErrorHandlerService,
              private router: Router,
              public auth: AuthService) {}

  pessoas = [];

  cols = [
    { field: 'nome', header: 'Nome', styleClass: ['col-50'] },
    { field: 'endereco', subfield: 'cidade', header: 'Cidade', styleClass: ['col-20'] },
    { field: 'endereco', subfield: 'estado', header: 'Estado', styleClass: ['col-20'] }
  ];

  actions: Action[] = [
    {
      key: 1,
      icon: 'fa fa-edit',
      tooltip: 'Editar pessoa..',
      disabled: !this.auth.hasAuthority('ROLE_CADASTRAR_PESSOA')
    },
    {
      key: 2,
      icon: 'fa fa-trash',
      tooltip: 'Excluir pessoa..',
      disabled: !this.auth.hasAuthority('ROLE_REMOVER_PESSOA')
    }
  ];

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

  aoMudarPagina(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.pesquisar(page);
  }

  pesquisar(page = 0) {
    this.filtro.page = page;
    this.pessoaService.pesquisar(this.filtro)
      .then(result => {
        this.paginatorProperties.totalRecords = result.total;
        this.pessoas = result.pessoas;
      });
  }

  aoEditar(pessoa: any) {
    this.router.navigate(['/pessoas', pessoa.id]);
  }

  aoExcluir(pessoa: any) {
    this.confirmationService.confirm({
      header: 'Opa, pera lá..',
      icon: 'fa fa-question',
      message: 'Deseja realmente excluir esta pessoa?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.id)
      .then(() => {
        this.pesquisar(this.filtro.page);
        this.toasty.success('Pessoa excluída com sucesso!');
      })
      .catch(err => {
        this.error.handler(err);
      });
  }

  ativarInativar(pessoa) {
    this.pessoaService.ativo(pessoa)
      .then(() => {
        this.toasty.success('Atualizei o status da pessoa, está tudo certo!');
      })
      .catch(err => {
        this.error.handler(err);
      });
  }

  ngOnInit(): void {}
}
