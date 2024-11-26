import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private currentLang = new BehaviorSubject<string>(this.getStorageItem('language', 'en'));
  currentLang$ = this.currentLang.asObservable();

  constructor(private translate: TranslateService) {
    const savedLang = this.getStorageItem('language', 'en');
    this.translate.setDefaultLang('en');
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string) {
    // First set the language
    this.translate.use(lang);
    this.currentLang.next(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = this.isRTL(lang) ? 'rtl' : 'ltr';
    }
    const currentUrl = this.router.url;
    const urlParts = currentUrl.split('/');
    urlParts[urlParts.length - 1] = lang;  // Replace the last segment with new language
    this.router.navigate(urlParts);
  }

  getCurrentLang(): string {
    return this.currentLang.value;
  }

  private isRTL(lang: string): boolean {
    return ['ar', 'he'].includes(lang);
  }

  private getStorageItem(key: string, defaultValue: string): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key) || defaultValue;
    }
    return defaultValue;
  }
}