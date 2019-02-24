export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

export class Pessoa {
  id: number;
  nome: string;
  ativo: boolean;
  endereco = new Endereco();
}

export class Categoria {
  id: number;
}

export class Lancamento {
  id: number;
  tipo = 'RECEITA';
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();

  constructor();
  constructor(id: number, tipo: string, descricao: string, dataVencimento: Date, dataPagamento: Date, valor: number, observacao: string, pessoa: Pessoa, categoria: Categoria);
  constructor(id?: number, tipo?: string, descricao?: string, dataVencimento?: Date, dataPagamento?: Date, valor?: number, observacao?: string, pessoa?: Pessoa, categoria?: Categoria) {
    this.id = id;
    this.tipo = tipo ? tipo : 'RECEITA';
    this.descricao = descricao;
    this.dataVencimento = dataVencimento;
    this.dataPagamento = dataPagamento;
    this.valor = valor;
    this.observacao = observacao;
    this.pessoa = pessoa ? pessoa : new Pessoa();
    this.categoria = categoria ? categoria : new Categoria();
  }

}

export class UsuarioLogin {
  email: string;
  senha: string;
}
