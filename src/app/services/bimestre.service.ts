import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bimestre } from '../modules/cadastros/bimestre/models/bimestre';
import { Api } from './api';

@Injectable()
export class BimestreService  extends Api<Bimestre> {

  constructor(
    public http: HttpClient,
  ) {
    super(http, 'bimestre');
  }
}
