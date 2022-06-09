import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html'
})
export class LayoutsComponent implements OnInit {
  constructor(
  ) { }

  ngOnInit() {
    document.body.setAttribute('data-topbar', 'dark');
    document.body.setAttribute('data-layout', 'horizontal');
    document.body.removeAttribute('data-sidebar');

  }

}