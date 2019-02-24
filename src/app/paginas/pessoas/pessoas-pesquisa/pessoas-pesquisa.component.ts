import {Component, OnInit} from '@angular/core';
import {PessoaFiltro, PessoaService} from '../../../services/pessoas/pessoa.service';
import {PaginatorProperties} from '../../../shared/paginator-properties.class';
import {ConfirmationService, LazyLoadEvent} from 'primeng/api';
import {ErrorHandlerService} from '../../../core/error-handler.service';
import {Router} from '@angular/router';
import { AuthService } from '../../../services/seguranca/auth.service';
import { ToastService } from '../../../services/util/toast.service';

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
