import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private platformId = inject(PLATFORM_ID);
  private currentLang = new BehaviorSubject<string>(this.getStorageItem('language', 'en'));
  currentLang$ = this.currentLang.asObservable();

  constructor(private translate: TranslateService) {
    const savedLang = this.getStorageItem('language', 'en');
    this.translate.setDefaultLang('en');
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    this.currentLang.next(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = this.isRTL(lang) ? 'rtl' : 'ltr';
    }
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