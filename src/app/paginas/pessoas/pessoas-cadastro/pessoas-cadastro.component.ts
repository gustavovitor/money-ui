import { Component, OnInit } from '@angular/core';
import { Lancamento, Pessoa } from '../../../core/model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {PessoaService} from '../../../services/pessoas/pessoa.service';
import {ErrorHandlerService} from '../../../core/error-handler.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import { ToastService } from '../../../services/util/toast.service';

@Component({
  selector: 'app-cadastro-pessoas',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent implements OnInit {

  constructor(private pessoaService: PessoaService,
              private toasty: ToastService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private route: ActivatedRoute,
              private title: Title,
              private formBuilder: FormBuilder) { }

  formulario: FormGroup;

  ngOnInit() {
    this.configurarFormulario();
    const idPessoa = this.route.snapshot.params['id'];

    this.atualizarTituloNovo();

    if (idPessoa) {
      this.buscarPessoa(idPessoa);
    }
  }

  get editando() {
    return Boolean(this.formulario.get('id').value);
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(60)
      ])],
      ativo: [true],
      endereco: this.formBuilder.group( {
        logradouro: [null, Validators.maxLength(120)],
        numero: [null, Validators.maxLength(32)],
        complemento: [null, Validators.maxLength(32)],
        bairro: [null, Validators.maxLength(60)],
        cep: [null, Validators.maxLength(30)],
        cidade: [null, Validators.maxLength(80)],
        estado: [null, Validators.maxLength(80)]
      })
    });
  }

  atualizarTituloEditando() {
    this.title.setTitle(`Editando a pessoa: ${this.formulario.get('nome')}`);
  }

  atualizarTituloNovo() {
    this.title.setTitle('Nova Pessoa');
  }

  buscarPessoa(idPessoa: number) {
    this.pessoaService.findById(idPessoa)
      .then(pessoa => {
        this.formulario.patchValue(pessoa);
        this.atualizarTituloEditando();
      })
      .catch(err => this.errorHandler.handler(err));
  }

  salvar() {
    if (this.editando) {
      this.atualizarPessoa();
    } else {
      this.adicionarPessoa();
    }
  }

  adicionarPessoa() {
    this.pessoaService.salvar(this.formulario.value)
      .then(() => {
        this.toasty.success('Pessoa cadastrada com sucesso!');
        this.router.navigate(['/pessoas']);
      })
      .catch(err => {
        this.errorHandler.handler(err);
      });
  }

  atualizarPessoa() {
    this.pessoaService.atualizar(this.formulario.value)
      .then(() => {
        this.toasty.success('Pessoa atualizada com sucesso!');
        this.router.navigate(['/pessoas']);
      })
      .catch(err => {
        this.errorHandler.handler(err);
      });
  }

  novo() {
    this.router.navigate(['/pessoas/novo']);
  }

  limpar() {
    this.formulario.reset();
  }

}
