import { Routes } from '@angular/router';
import { CreateNewPasswordComponent } from './create-new-password/create-new-password.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { VerifyIdentityComponent } from './verify-identity/verify-identity.component';
import { ReCaptchaSiteKeyResolver } from './shared/services/re-captcha-site-key-resolver';

export const routes: Routes = [
  { path: '', redirectTo: '/identification', pathMatch: 'full' },
  { path: 'identification', component: VerifyIdentityComponent, resolve: { siteKey: ReCaptchaSiteKeyResolver } },
  { path: 'verification', component: VerifyCodeComponent },
  { path: 'new-password', component: CreateNewPasswordComponent }
];
