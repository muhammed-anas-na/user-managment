import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../services/language-service.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex gap-2">
      <button
        *ngFor="let lang of languages"
        (click)="switchLanguage(lang.code)"
        [class.font-bold]="currentLang === lang.code"
        class="px-3 py-1 rounded hover:bg-gray-100"
      >
        {{ lang.name }}
      </button>
    </div>
  `
})
export class LanguageSwitcherComponent {
  languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' }
  ];
  currentLang: string;

  constructor(private _languageService: LanguageService) {
    this.currentLang = this._languageService.getCurrentLang();
  }

  switchLanguage(lang: string) {
    this._languageService.setLanguage(lang);
    this.currentLang = lang;
  }
}