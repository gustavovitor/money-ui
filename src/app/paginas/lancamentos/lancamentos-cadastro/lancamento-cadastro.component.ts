import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categorias/categoria.service';
import { PessoaService } from '../../../services/pessoas/pessoa.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {LancamentoService} from '../../../services/lancamentos/lancamento.service';
import {ErrorHandlerService} from '../../../core/error-handler.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
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
  formulario: FormGroup;

  qtdMesesReplica = 1;

  dataVencimento: Date;
  dataPagamento: Date;

  constructor(private categoriaService: CategoriaService,
              private pessoaService: PessoaService,
              private lancamentoService: LancamentoService,
              private toasty: ToastService,
              private errorHandler: ErrorHandlerService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.configurarFormulario();
    const idLancamento = this.route.snapshot.params['id'];

    if (idLancamento) {
      this.carregarLancamento(idLancamento);
    }

    this.atualizarTituloNovo();

    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando() {
    return Boolean(this.formulario.get('id').value);
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [null],
      descricao: [null, [this.validadarObrigatoriedade, this.validarTamanhoMinimo(5)]],
      valor: [null, Validators.required],
      pessoa: this.formBuilder.group({
        id: [null, Validators.required]
      }),
      categoria: this.formBuilder.group({
        id: [null, Validators.required]
      }),
      observacao: []
    });
  }

  validadarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(size: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= size) ? null :
        { tamanhoMinimo: { requiredLength: size, actualLength: input.value.lengthx } };
    };
  }

  carregarLancamento(idLancamento: number) {
    this.lancamentoService.findById(idLancamento)
      .then(lancamento => {
        this.formulario.patchValue(lancamento);
        this.atualizarTituloEditando();
      })
      .catch(err => { this.errorHandler.handler(err); });
  }

  salvar() {
    if (this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento();
    }
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.formulario.value)
      .then(() => {
        this.toasty.success('Lançamento atualizado com sucesso!');
        this.router.navigate(['/lancamentos']);
      })
      .catch(err => {
        this.errorHandler.handler(err);
      });
  }

  adicionarLancamento() {
    this.lancamentoService.salvar(this.formulario.value, this.qtdMesesReplica)
      .then(() => {
        this.toasty.success('Lançamento cadastrado com sucesso!');
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
      });
  }

  carregarPessoas() {
    this.pessoaService.listarTodas()
      .then(result => {
        this.pessoas = result.pessoasDropdown;
      });
  }

  novo() {
    this.router.navigate(['/lancamentos/novo']);
  }

  limpar() {
    this.formulario.reset();
  }

  atualizarTituloEditando() {
    this.title.setTitle(`Editando o lançamento ${this.formulario.get('descricao').value}`);
  }

  atualizarTituloNovo() {
    this.title.setTitle(`Novo Lançamento`);
  }
}
