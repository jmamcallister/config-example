import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { VerifyIdentityComponent } from './verify-identity/verify-identity.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { CreateNewPasswordComponent } from './create-new-password/create-new-password.component';
import { routes } from './app-routes';
import { SharedModule } from './shared/shared.module';
import { ConfigService, configurationServiceInitializerFactory } from './shared/services/config.service';
import { HttpClientModule } from '@angular/common/http';
import { ReCaptchaSiteKeyResolver } from './shared/services/re-captcha-site-key-resolver';
import { ReCaptchaService } from './shared/services/re-captcha.service';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { IovationService } from './shared/services/iovation.service';
import { IovationUrlResolver } from './shared/services/iovation-url-resolver';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    VerifyIdentityComponent,
    VerifyCodeComponent,
    CreateNewPasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    SharedModule.forRoot()
  ],
  providers: [
    ConfigService,
    IovationService,
    IovationUrlResolver,
    ReCaptchaService,
    ReCaptchaSiteKeyResolver,
    { provide: APP_INITIALIZER, useFactory: configurationServiceInitializerFactory, deps: [ConfigService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
