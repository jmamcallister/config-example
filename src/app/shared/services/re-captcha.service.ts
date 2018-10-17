import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable()
export class ReCaptchaService {
  captchaSiteKey: any = new BehaviorSubject<string>(null);
  configuration: any;

  constructor( private http: HttpClient, private configService: ConfigService) {
    this.configuration = configService.getConfig();
  }

  fetchCaptchaSiteKey() {
    const url = this.configuration.passwordReset.protocol + '://' +
      this.configuration.passwordReset.host + ':' +
      this.configuration.passwordReset.port +
      this.configuration.passwordReset.captchaSiteKeyUrl;
    return this.http.get<any>(url).subscribe( res => {
      this.captchaSiteKey.next(res.siteKey);
      return res;
    });
  }
}
