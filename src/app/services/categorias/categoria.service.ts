import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MoneyHttp} from "../seguranca/money-http";

export class CategoriaDropdown {
  label: string;
  value: number;

  constructor(nome: string, id: number){
    this.label = nome;
    this.value = id;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: MoneyHttp) {}

  URL = 'http://localhost:8080/categorias';

  listarTodas(): Promise<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YWRtaW5AdGhyZWVsYXllcnMuY29tOjEyMzQ1Ng==');

    return this.http.get<any>(`${this.URL}`, { headers }).toPromise()
      .then(response => {
        let categoriasDropdown = [];
        for(const object of response){
          categoriasDropdown.push(new CategoriaDropdown(object.nome, object.id));
        }
        const result = {
          categoriasDropdown,
          response
        };
        return result;
      })
  }
}
