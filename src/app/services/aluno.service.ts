import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alunos } from '../modules/cadastros/bimestre/models/alunos';
import { Api } from './api';

@Injectable()
export class AlunoService  extends Api<Alunos> {

  constructor(
    public http: HttpClient,
  ) {
    super(http, 'alunos');
  }
}
