import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/seguranca/auth.service';
import { LogoutService } from '../../services/seguranca/logout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService,
              public logout: LogoutService) { }

  ngOnInit() {
  }

}
