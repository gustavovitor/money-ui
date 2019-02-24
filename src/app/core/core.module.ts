import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, CurrencyPipe, DatePipe} from '@angular/common';
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { ConfirmationService, ConfirmDialogModule, MessageService, ProgressBarModule } from 'primeng/primeng';

import {NavbarComponent} from './navbar/navbar.component';
import {ErrorHandlerService} from './error-handler.service';
import {RouterModule} from '@angular/router';
import { NotFoundComponent } from './not-found.component';
import {Title} from '@angular/platform-browser';
import {LogService} from '../services/util/log.service';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';
import {MoneyHttp} from '../services/seguranca/money-http';
import { ForbiddenComponent } from './forbidden.component';
import { ToastModule } from 'primeng/toast';

/* Necessário registrar a localização nessas versões mais recentes.. */
registerLocaleData(localePt, 'pt');

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return localStorage.getItem('access_token');
    },
    whitelistedDomains: environment.TokenWhitelistedDomains,
    blacklistedRoutes: environment.TokenBlacklistedRoutes
  };
}

@NgModule({
  declarations: [NavbarComponent, NotFoundComponent, ForbiddenComponent],
  imports: [
    CommonModule,
    RouterModule,

    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory
      }
    }),

    ConfirmDialogModule
  ],
  exports: [
    NavbarComponent,
    ToastModule,
    ProgressBarModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    MessageService,
    ConfirmationService,
    Title,
    LogService,
    CurrencyPipe,
    DatePipe,
    MoneyHttp,
    { provide: 'LogPrefix', useValue: '[INFO]' }
  ]
})
export class CoreModule { }
