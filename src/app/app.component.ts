import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { ThemeService } from './services/theme-service.service';
import { LanguageService } from './services/language-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, CommonModule, FormsModule, LanguageSwitcherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  currentTheme = '';

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    // Initialize with saved values
    const savedTheme = this.themeService.getCurrentTheme();
    const savedLang = this.languageService.getCurrentLang();

    // Navigate to the correct route with saved theme and language
    const currentUrl = this.router.url;
    if (currentUrl === '/' || !currentUrl.includes('/theme')) {
      this.router.navigate([`/login/${savedTheme}/${savedLang}`]);

    }

    // Subscribe to route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        if (url.includes('theme1')) {
          this.currentTheme = 'theme1-background';
          this.themeService.setTheme('theme1');
        } else if (url.includes('theme2')) {
          this.currentTheme = 'theme2-background';
          this.themeService.setTheme('theme2');
        }

        // Update language from URL
        if (url.includes('/ar')) {
          this.languageService.setLanguage('ar');
        } else if (url.includes('/en')) {
          this.languageService.setLanguage('en');
        }
      }
    });
  }
}