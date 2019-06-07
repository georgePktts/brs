import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { $ } from 'protractor';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToRoute(path: string) {
    this.router.navigate([path]);
  }

  navClick(nav_item) {
    console.log(nav_item);

    document.getElementById('nav-link1').classList.remove('active');
    document.getElementById('nav-link2').classList.remove('active');
    document.getElementById('nav-link3').classList.remove('active');

    document.getElementById(nav_item).classList.add('active');
  }
}
