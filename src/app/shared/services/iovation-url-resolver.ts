import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IovationService } from './iovation.service';
import { Injectable } from '@angular/core';

@Injectable()
export class IovationUrlResolver {

  constructor(private iovationService: IovationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.iovationService.fetchIovationScriptUrl();
  }
}
