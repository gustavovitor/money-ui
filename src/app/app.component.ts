import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { routerAnimation } from './router-animation';
import { LoadingService } from './services/util/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    routerAnimation
  ]
})
export class AppComponent {
  constructor(private router: Router,
              private loading: LoadingService) {
  }

  exibeNavBar() {
    return this.router.url !== '/auth';
  }

  preparaRota(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['state'];
  }
}
