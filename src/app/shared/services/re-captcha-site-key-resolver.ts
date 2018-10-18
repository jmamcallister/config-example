import { ReCaptchaService } from './re-captcha.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class ReCaptchaSiteKeyResolver {
  constructor(private reCaptchaService: ReCaptchaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.reCaptchaService.fetchCaptchaSiteKey();
  }
}
