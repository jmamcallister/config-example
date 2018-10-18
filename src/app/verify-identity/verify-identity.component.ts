import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../shared/services/config.service';
import { ReCaptchaService } from '../shared/services/re-captcha.service';
import { IovationService } from '../shared/services/iovation.service';

@Component({
  selector: 'app-verify-identity',
  templateUrl: './verify-identity.component.html',
  styleUrls: ['./verify-identity.component.css']
})
export class VerifyIdentityComponent implements OnInit {

  email: FormControl;
  captcha: FormControl;
  identityForm: FormGroup;
  captchaToken: string;

  constructor(
    private configService: ConfigService,
    private iovationService: IovationService,
    public reCaptchaService: ReCaptchaService
  ) { }

  ngOnInit() {
    this.email = new FormControl('', Validators.required);
    this.captcha = new FormControl(null, Validators.required);
    this.identityForm = new FormGroup({
      email: this.email,
      captcha: this.captcha
    });
    this.iovationService.initIovation();
  }

  captchaResolved(token: string) {
    this.captchaToken = token || 'invalid-token';
  }

  submitEmail() {
    console.log('submitting email ' + this.email.value);
    console.log('iovation blackbox value: ' + this.iovationService.getBlackBoxValue());
  }
}
