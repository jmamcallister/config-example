import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, of } from 'rxjs';

export function configurationServiceInitializerFactory(configurationService: ConfigService): Function {
  return () => configurationService.load();
}

@Injectable()
export class ConfigService {

  private loaded = false;
  private configuration: any;


  static getBaseUrl(key: string, configuration: any): string {
    return configuration[key].protocol + '://' +
      configuration[key].host + ':' +
      configuration[key].port;
  }

  constructor(private http: HttpClient) { }

  public load(): Promise<any> {
    if (this.loaded) {
      return of(this, this.configuration).toPromise();
    } else {
      const configurationObservable = this.http.get(`/password-reset/1.0/ui/config`);
      configurationObservable.subscribe(
        config => {
          this.configuration = config;
          console.log(`got configuration: ${JSON.stringify(this.configuration)}`);
          this.loaded = true;
        },
        err => {
          console.log(`error loading configuration: ${JSON.stringify(err)}`);
          return EMPTY;
        }
      );
      return configurationObservable.toPromise();
    }
  }
  public getConfig(): any {
    return this.configuration;
  }
}
