const PrimaryWebService = 'http://localhost:8080/';

export const environment = {
  production: false,

  TokenWhitelistedDomains: [new RegExp('localhost:8080')],
  TokenBlacklistedRoutes: [new RegExp('/oauth/token')],

  WebServiceList: {
    URLLancamentos: PrimaryWebService + 'lancamentos',
    URLCategorias: PrimaryWebService + 'categorias',
    URLPessoas: PrimaryWebService + 'pessoas',
    URLAuth: PrimaryWebService + 'oauth/token',
    URLLogout: PrimaryWebService + 'token/revoke'
  }
};
