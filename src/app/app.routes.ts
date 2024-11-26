import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { VerificationComponent } from './verification/verification.component';
import { SuccessComponent } from './success/success.component';
import { DashComponent } from './dash/dash.component';
import { RedirectComponent } from './redirect/redirect.component';

export const routes: Routes = [
    {
        path: '',
        component: RedirectComponent,
        pathMatch: 'full'
    },
    { path: 'login/:theme/:lng', component: LoginComponent },
    { path: 'signup/:theme/:lng', component: SignupComponent },
    { path: 'verify/:theme/:lng', component: VerificationComponent },
    { path: 'success/:theme/:lng', component: SuccessComponent },
    { path: 'dashboard/:theme/:lng', component: DashComponent }
];

// this.router.navigate(['/login', this.themeService.getCurrentTheme(), this.languageService.getCurrentLang()]);