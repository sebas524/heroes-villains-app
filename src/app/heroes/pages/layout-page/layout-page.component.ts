import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from 'src/app/auth/interfaces/user.interface';
import { Router } from '@angular/router';

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
  constructor(private authService: AuthService, private router: Router) {}

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

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
