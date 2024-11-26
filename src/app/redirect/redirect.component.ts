import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  template: ''
})
export class RedirectComponent implements OnInit {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    const theme = this.getStorageItem('theme', 'theme1');
    const lang = this.getStorageItem('language', 'en');
    this.router.navigate(['/login', theme, lang]);
  }
  
  private getStorageItem(key: string, defaultValue: string): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key) || defaultValue;
    }
    return defaultValue;
  }
} 