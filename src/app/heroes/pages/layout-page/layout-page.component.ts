import { Component } from '@angular/core';

interface sidebarItems {
  label: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [],
})
export class LayoutPageComponent {
  public myItems: sidebarItems[] = [
    {
      label: 'List',
      icon: 'label',
      url: './list',
    },
    {
      label: 'Add',
      icon: 'add',
      url: './new-hero',
    },
    {
      label: 'Search',
      icon: 'search',
      url: './search',
    },
  ];
}
