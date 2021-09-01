import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notas } from '../modules/cadastros/notas/models/notas';
import { Api } from './api';

@Injectable()
export class NotasService extends Api<Notas> {

  constructor(
    public http: HttpClient,
  ) { super(http, 'notas');
  }
}
