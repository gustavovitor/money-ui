import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { Lancamento } from "../../core/model";

import { MoneyHttp } from "../seguranca/money-http";

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;

  page = 0;
  size = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  URL = 'http://localhost:8080/lancamentos';

  constructor(private http: MoneyHttp) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.append('page', filtro.page.toString());
    params = params.append('size', filtro.size.toString());

    if(filtro.descricao){
      params = params.append('descricao', filtro.descricao);
    }

    if(filtro.dataVencimentoDe){
      params = params.append('dataVencimentoDe', moment(filtro.dataVencimentoDe).format('YYYY-MM-DD'));
    }

    if(filtro.dataVencimentoAte){
      params = params.append('dataVencimentoAte', moment(filtro.dataVencimentoAte).format('YYYY-MM-DD'));
    }

    return this.http.get<any>(`${this.URL}?resumo`, { params })
      .toPromise().then(res => {
        const lancamentos = res.content;

        const results = {
          lancamentos,
          total: res.totalElements
        };

        return results;
      });
  }

  findById(id: number): Promise<Lancamento> {
    return this.http.get<Lancamento>(`${this.URL}/${id}`).toPromise()
      .then(response => {
        const lancamento = new Lancamento(response.id, response.tipo, response.descricao,
                                        new Date(response.dataVencimento), new Date(response.dataPagamento),
                                        response.valor, response.observacao, response.pessoa, response.categoria);
        return lancamento;
      });
  }

  atualizar(lancamento: Lancamento): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put<Lancamento>(`${this.URL}/${lancamento.id}`, lancamento, { headers }).toPromise();
  }

  salvar(lancamento: Lancamento): Promise<Lancamento> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post<Lancamento>(`${this.URL}`, lancamento, { headers }).toPromise();
  }

  excluir(codigo: number): Promise<void>{
    return this.http.delete(`${this.URL}/${codigo}`).toPromise().then(() => null );
  }
}
