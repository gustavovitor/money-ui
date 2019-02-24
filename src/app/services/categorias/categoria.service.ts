import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MoneyHttp} from '../seguranca/money-http';
import { environment } from '../../../environments/environment';

export class CategoriaDropdown {
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
export class CategoriaService {

  constructor(private http: MoneyHttp) {}

  URL = environment.WebServiceList.URLCategorias;

  listarTodas(): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YWRtaW5AdGhyZWVsYXllcnMuY29tOjEyMzQ1Ng==');

    return this.http.get<any>(`${this.URL}`, { headers }).toPromise()
      .then(response => {
        const categoriasDropdown = [];
        for (const object of response) {
          categoriasDropdown.push(new CategoriaDropdown(object.nome, object.id));
        }
        const result = {
          categoriasDropdown,
          response
        };
        return result;
      });
  }
}
