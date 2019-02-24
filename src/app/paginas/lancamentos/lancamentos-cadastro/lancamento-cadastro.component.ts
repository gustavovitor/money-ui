import { Component, OnInit } from '@angular/core';
import { CategoriaService } from "../../../services/categorias/categoria.service";
import { PessoaService } from "../../../services/pessoas/pessoa.service";
import { Lancamento } from "../../../core/model";
import {FormControl} from "@angular/forms";
import {LancamentoService} from "../../../services/lancamentos/lancamento.service";
import {ErrorHandlerService} from "../../../core/error-handler.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import { ToastService } from '../../../services/util/toast.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
    ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(private categoriaService: CategoriaService,
              private pessoaService: PessoaService,
              private lancamentoService: LancamentoService,
              private toasty: ToastService,
              private errorHandler: ErrorHandlerService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title) { }

  ngOnInit() {
    const idLancamento = this.route.snapshot.params['id'];

    if(idLancamento) {
      this.carregarLancamento(idLancamento);
    }

    this.atualizarTituloNovo();

    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando() {
    return Boolean(this.lancamento.id);
  }

  carregarLancamento(idLancamento: number){
    this.lancamentoService.findById(idLancamento)
      .then(lancamento => {
        this.lancamento = lancamento
        this.atualizarTituloEditando();
      })
      .catch(err => { this.errorHandler.handler(err) });
  }

  salvar(form: FormControl) {
    if(this.editando) {
      this.atualizarLancamento(form);
    }else{
      this.adicionarLancamento(form);
    }
  }

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
      .then(lancamento => {
        this.lancamento = lancamento;
        this.toasty.success('Lancamento atualizado com sucesso!');
        this.router.navigate(['/lancamentos']);
      })
      .catch(err => {
        this.errorHandler.handler(err);
      });
  }

  adicionarLancamento(form: FormControl) {
    this.lancamentoService.salvar(this.lancamento)
      .then(() => {
        this.toasty.success('Lancamento cadastrado com sucesso!');
        this.router.navigate(['/lancamentos']);
      })
      .catch(err => {
        this.errorHandler.handler(err);
      });
  }

  carregarCategorias() {
    this.categoriaService.listarTodas()
      .then(result => {
        this.categorias = result.categoriasDropdown;
      })
  }

  carregarPessoas() {
    this.pessoaService.listarTodas()
      .then(result => {
        this.pessoas = result.pessoasDropdown;
      })
  }

  novo() {
    this.router.navigate(['/lancamentos/novo']);
  }

  limpar(form: FormControl) {
    form.reset();
    setTimeout(function () {
      this.lancamento = new Lancamento();
    }.bind(this), 1);
  }

  atualizarTituloEditando() {
    this.title.setTitle(`Editando o lançamento: ${this.lancamento.descricao}`);
  }

  atualizarTituloNovo() {
    this.title.setTitle(`Novo Lançamento`);
  }
}
