import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class IovationService {
  iovationComplete: Subject<boolean> = new BehaviorSubject<boolean>(false);
  blackBoxValue: Subject<string> = new BehaviorSubject<string>(null);
  iovationUrl: any = new BehaviorSubject<string>(null);
  configuration: any;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.configuration = configService.getConfig();
  }

  public fetchIovationScriptUrl() {
    const url = ConfigService.getBaseUrl('passwordReset', this.configuration) +
      this.configuration.passwordReset.iovationUrl;
    return this.http.get<any>(url).subscribe(res => {
      this.iovationUrl.next(res.iovationUrl);
      return res;
    });
  }

  initIovation() {
    this.initIovationConfig();
    this.iovationUrl.subscribe(data => {
      if (data) { // wait for data to be available, else script may be loaded twice
        console.log('data from iovationUrl resolve: ' + data);
        const url = ConfigService.getBaseUrl('passwordReset', this.configuration) +
          this.configuration.passwordReset.iovationUrl;
        this.http.get<any>(url).subscribe(res => {
          this.loadIovationScript(res.iovationUrl);
        });
      }
    });
  }

  private loadIovationScript(iovationUrl: string) {
    const script: any = document.createElement('script');
    script.type = 'text/javascript';
    if (script.readyState) {
      // IE
      script.onreadystatechange = () => {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          this.iovationSuccess();
        }
      };
    } else {
      // Other browsers
      script.onload = () => {
        this.iovationSuccess();
      };
    }
    script.src = iovationUrl;
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  private initIovationConfig() {
    (<any>window).io_install_stm = false; // do not install Active X
    (<any>window).io_exclude_stm = 12; // do not run Active X
    (<any>window).io_install_flash = false; // do not install Flash
    (<any>window).io_min_flash_version = 9999; // disable Flash
    (<any>window).io_enable_rip = true; // collect real IP information
  }

  private iovationSuccess() {
    this.iovationComplete.next(true);
    const value = this.getBlackBoxValue();
    this.blackBoxValue.next(value);
  }

  getBlackBoxValue(): any {
    const bb = (<any>window).ioGetBlackbox();
    return bb.blackbox;
  }
}
