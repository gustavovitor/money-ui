import { Component, OnInit } from '@angular/core';
import {Pessoa} from "../../../core/model";
import {FormControl} from "@angular/forms";
import {PessoaService} from "../../../services/pessoas/pessoa.service";
import {ErrorHandlerService} from "../../../core/error-handler.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
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
              private title: Title) { }

  pessoa = new Pessoa();

  ngOnInit() {
    const idPessoa = this.route.snapshot.params['id'];

    this.atualizarTituloNovo();

    if(idPessoa) {
      this.buscarPessoa(idPessoa);
    }
  }

  get editando() {
    return Boolean(this.pessoa.id);
  }

  atualizarTituloEditando() {
    this.title.setTitle(`Editando a pessoa: ${this.pessoa.nome}`);
  }

  atualizarTituloNovo() {
    this.title.setTitle('Nova Pessoa');
  }

  buscarPessoa(idPessoa: number) {
    this.pessoaService.findById(idPessoa)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.atualizarTituloEditando();
      })
      .catch(err => this.errorHandler.handler(err));
  }

  salvar(form: FormControl) {
    if(this.editando){
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl) {
    this.pessoa.ativo = true;
    this.pessoaService.salvar(this.pessoa)
      .then(() => {
        this.toasty.success('Pessoa cadastrada com sucesso!');
        this.router.navigate(['/pessoas']);
      })
      .catch(err => {
        this.errorHandler.handler(err);
      })
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(() => {
        this.toasty.success('Pessoa atualizada com sucesso!');
        this.router.navigate(['/pessoas']);
      })
      .catch(err => {
        this.errorHandler.handler(err);
      })
  }

  novo() {
    this.router.navigate(['/pessoas/novo']);
  }

}
