import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private currentTheme = new BehaviorSubject<string>(this.getStorageItem('theme', 'theme1'));
  currentTheme$ = this.currentTheme.asObservable();

  constructor() {
    const savedTheme = this.getStorageItem('theme', 'theme1');
    this.setTheme(savedTheme);
  }

  setTheme(theme: string) {
    this.currentTheme.next(theme);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
    //       // Update URL with new theme
    const currentUrl = this.router.url;
    const urlParts = currentUrl.split('/');
    urlParts[urlParts.length - 2] = theme;
    this.router.navigate(urlParts);
    }
  }

  getCurrentTheme(): string {
    return this.currentTheme.value;
  }

  private getStorageItem(key: string, defaultValue: string): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key) || defaultValue;
    }
    return defaultValue;
  }
}