import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  styleUrls: ['./nav-menu.component.css'],
  templateUrl: './nav-menu.component.html'
})
export class NavMenuComponent implements OnInit {
  isLoggedIn = false;

  ngOnInit() {
  }
}
