const PrimaryWebService = 'https://money-api-gustavovitor.herokuapp.com/';

export const environment = {
  production: true,

  TokenWhitelistedDomains: [new RegExp('money-api-gustavovitor.herokuapp.com')],
  TokenBlacklistedRoutes: [new RegExp('/oauth/token')],

  WebServiceList: {
    URLLancamentos: PrimaryWebService + 'lancamentos',
    URLCategorias: PrimaryWebService + 'categorias',
    URLPessoas: PrimaryWebService + 'pessoas',
    URLAuth: PrimaryWebService + 'oauth/token',
    URLLogout: PrimaryWebService + 'token/revoke'
  }
};
