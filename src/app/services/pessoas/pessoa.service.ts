import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Pessoa} from '../../core/model';
import {MoneyHttp} from '../seguranca/money-http';
import { environment } from '../../../environments/environment';

export class PessoaFiltro {
  nome: string;

  page = 0;
  size = 5;
}

export class PessoasDropdown {
  label: string;
  value: number;

  constructor(nome: string, id: number) {
    this.label = nome;
    this.value = id;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  URL = environment.WebServiceList.URLPessoas;

  constructor(private http: MoneyHttp) {}

  pesquisar(filtro: PessoaFiltro) {
    let params = new HttpParams();

    params = params.append('page', filtro.page.toString());
    params = params.append('size', filtro.size.toString());

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.URL}`, { params })
      .toPromise()
      .then(res => {
        const pessoas = res.content;

        const results = {
          pessoas,
          total: res.totalElements
        };

        return results;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.URL}/${codigo}`).toPromise().then(() => null );
  }

  ativo(pessoa): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.URL}/${pessoa.id}/ativo`, pessoa.ativo, { headers }).toPromise().then(() => null );
  }

  salvar(pessoa: Pessoa): Promise<Pessoa> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post<Pessoa>(`${this.URL}`, pessoa, { headers }).toPromise();
  }

  listarTodas() {
    return this.http.get<any>(`${this.URL}`).toPromise()
      .then(response => {
        const pessoasDropdown = [];
        for (const object of response.content) {
          pessoasDropdown.push(new PessoasDropdown(object.nome, object.id));
        }
        const result = { pessoasDropdown, response };
        return result;
      });
  }

  findById(idPessoa: number): Promise<Pessoa> {
    return this.http.get<Pessoa>(`${this.URL}/${idPessoa.toString()}`).toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put<Pessoa>(`${this.URL}/${pessoa.id.toString()}`, pessoa, { headers }).toPromise();
  }
}
