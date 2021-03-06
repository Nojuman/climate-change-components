import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Scenario } from '../models/scenario.model';
import { ApiHttp } from './api-http.interface';
import { API_HOST, API_HTTP } from '../config';
import { APICacheService } from './api-cache.service';

/*
 * Scenario Service
 * Returns scenarios from API
 */
@Injectable()
export class ScenarioService {

  constructor(@Inject(API_HOST) private apiHost: string,
              @Inject(API_HTTP) private apiHttp: ApiHttp,
              private cache: APICacheService) {}

  public list(): Observable<Scenario[]> {
    const url = this.apiHost + '/api/scenario/';
    const request = this.apiHttp.get(url);
    const response = this.cache.get('climate.api.scenario.list', request);
    return response.map(resp => resp.json() || [] as Scenario[]);
  }
}
