import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Api } from 'src/app/services/api';
import { NotasService } from 'src/app/services/notas.service';
import { environment } from 'src/environments/environment';
import { Alunos } from './models/alunos';
import { Avaliacao } from './models/avaliacao';
import { Bimestre } from './models/bimestre';
import { Notas } from './models/notas';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css'],
  providers: [NotasService]
})
export class NotasComponent implements OnInit {

  public form!: FormGroup;
  public urlAvaliacao: string;
  public urlAlunos: string;
  public urlNotaAluno: string;
  public urlLerNota: string;
  public cont: number = 0;
  public cont_not: number = 0;
  public contAv: number = 0;
  public contAv_not: number = 0;
  public notas!: Notas;

  public listaAvaliacao: Avaliacao[] = [];
  public listaAvaliacaoAux: Avaliacao[] = [];
  public listaBimestre: Bimestre[] = [];
  public listaAlunos: Alunos[] = [];
  public listaNotas: Notas[] = [];
  public listaNotasAv: Notas[] = [];
  public listaBimestreAux: Bimestre[] = [];
  public bimestreaux: Bimestre | undefined;
  public avaliacao: Bimestre | undefined;
  public aval_exist: boolean = false;

  public registroId: number = 0;
  private subscription!: Subscription;
  public contador: number = 0;

  @Input() public valorInput: string = '';
  @Input() public api!: Api<any>;

  public selectedAluno!: Alunos;
  public selectedBimestre!: Bimestre;
  public selectedAvaliacao!: Avaliacao;
  public carregar: boolean = true;
  public pesquisaCar: boolean = true;

  constructor(
    private fb: FormBuilder,
    public service: NotasService,
    public http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,

  ) {
    this.urlAvaliacao = environment.api + '/api/avaliacao';
    this.urlAlunos = environment.api + '/api/alunos/nome';
    this.urlNotaAluno = environment.api + '/api/bimestre/nota/aluno';
    this.urlLerNota = environment.api + '/api/nota';
    this.criarForm();

  }


  ngOnInit(): void {
    this.carregar= true;
    this.subscription = this.route.data.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      const dados = params;
      console.log(dados.pathApi);
      if (dados.pathApi === 'nota') {

        this.pesquisaCar = true;
        this.router.navigate(['pesquisa'], { relativeTo: this.route.parent });

      } else {

        this.pesquisaCar = false;
        this.buscarAvaliacao(0);
        this.subscription = this.route.params.subscribe(params => {
          // tslint:disable-next-line: no-string-literal
          this.leredit(params['id']);
        });

      }
    });


  }

  public criarForm(): void {
    // tslint:disable-next-line: max-line-length
    this.form = this.fb.group({
      id_Avaliacao: [null, Validators.required],
      nota: [null, Validators.compose([
        Validators.required,
        Validators.max(10)
      ])],
      id_Aluno: [null, Validators.required],
      id_Bimestre: [null, Validators.required],
    });
  }
  public get id_aluno() {
    return this.form.get('id_Aluno') as FormGroup;
  }
  public get id_bimestre() {
    return this.form.get('id_Bimestre') as FormGroup;
  }
  public get id_avaliacao() {
    return this.form.get('id_Avaliacao') as FormGroup;
  }

  public get nota() {
    return this.form.get('nota') as FormGroup;
  }

  private leredit(value: number) {
    if (value) {
      this.registroId = value;
      // tslint:disable-next-line: deprecation
      this.ler(value).subscribe(registro => {
        if (registro) {
          this.notas = registro;
          const aluno = this.notas.id_Aluno?.id;
          const id = aluno;
          console.log(id);
          this.buscarTodosBimestrePorAluno(id).subscribe((registro1: Bimestre[]) => {
            this.listaBimestre = registro1;
            console.log('Esse' + registro1);
          }, error => {
            console.error(error);
            alert('Deu Erro na hora de Carregar Totos os itens');
          });
        }
      }, error => {
        console.error(error);
        alert('Não foi possível encontrar o registro de Aluno para Bimestre' + value);
      });
    }
  }

  public ler(id: number): Observable<Notas> {
    return this.http.get<Notas>(this.urlLerNota + '/id/' + id).pipe(map((item: any) => {
      return item;
    }));
  }

  public buscarTodosAvaliacao(): Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>(this.urlAvaliacao).pipe(map((item: Avaliacao[]) => {
      return item;
    }));
  }

  public buscarAvaliacao(id: number) {
    // tslint:disable-next-line: deprecation
    const descr = id;
    console.log(descr);
    if (descr === 0) {
      this.buscarTodosAvaliacao().subscribe((registro: Avaliacao[]) => {
        this.listaAvaliacao = registro;
        this.carregar = false;
        console.log(registro);
      }, error => {
        console.error(error);
        alert('Deu Erro na hora de Carregar Totos os itens');
      });
    } else {
      this.listaAvaliacao = [];
      this.buscarTodosAvaliacao().subscribe((registro: Avaliacao[]) => {
        this.listaAvaliacaoAux = registro;
        console.log(registro);
        this.buscarTodasNotas().subscribe((registro_nota: Notas[]) => {
          this.listaNotasAv = registro_nota;
          for (this.contAv = 0; this.contAv < this.listaAvaliacaoAux.length; this.contAv++) {

            this.aval_exist = false;

            for (this.contAv_not = 0; this.contAv_not < this.listaNotasAv.length; this.contAv_not++) {
              if ((descr === this.listaNotasAv[this.contAv_not].id_Bimestre) &&
                (this.listaAvaliacaoAux[this.contAv].id === this.listaNotasAv[this.contAv_not].id_Avaliacao)) {
                this.aval_exist = true;
                this.contAv_not = this.listaNotasAv.length;
              }
            }

            if (!this.aval_exist) {
              this.avaliacao = this.listaAvaliacaoAux[this.contAv];
              this.listaAvaliacao.push(this.avaliacao);
            }
          }
          this.carregar = false;
        }, error => {
          console.error(error);
          alert('Deu Erro na hora de validar Avaliação');
        });

      }, error => {
        console.error(error);
        alert('Deu Erro na hora de Carregar Totos os itens');
      });

    }
  }



  public buscarTodosAlunos(value: any): Observable<Alunos[]> {
    return this.http.get<Alunos[]>(this.urlAlunos+'/'+ value).pipe(map((item: Alunos[]) => {
      return item;
    }));

  }

  private buscarAlunos(value: any) {
    // tslint:disable-next-line: deprecation
    this.buscarTodosAlunos(value).subscribe((registro: Alunos[]) => {
      this.listaAlunos = registro;
      
      console.log(registro);
    }, error => {
      console.error(error);
      alert('Deu Erro na hora de Carregar Totos os itens');
    });
  }

  public buscarTodosBimestrePorAluno(value: any): Observable<Bimestre[]> {
    return this.http.get<Bimestre[]>(this.urlNotaAluno + '/' + value).pipe(map((item: Bimestre[]) => {
      return item;
    }));
  }

  public buscarTodasNotas(): Observable<Notas[]> {
    return this.http.get<Notas[]>(this.urlLerNota + '/').pipe(map((item: Notas[]) => {
      return item;
    }));
  }

  public filtroAlunos(event: any) {
    let valor = event.query;
     this.buscarAlunos(valor);
   }
  public buscarBimestrePorAluno() {
    // tslint:disable-next-line: deprecation
    const descr = this.form.controls['id_Aluno'].value;
    console.log(descr);
    this.buscarTodosBimestrePorAluno(descr.id).subscribe((registro: Bimestre[]) => {
      this.listaBimestreAux = registro;
      console.log(registro);
      if (this.listaBimestreAux.length === 0) {
        alert('Nenhum Bimestre Cadastrado Para o Aluno');
      }
      else {
        this.buscarTodasNotas().subscribe((registro_nota: Notas[]) => {
          this.listaNotas = registro_nota;

          this.listaBimestre = [];

          for (this.cont = 0; this.cont < this.listaBimestreAux.length; this.cont++) {
            this.contador = 0;

            for (this.cont_not = 0; this.cont_not < this.listaNotas.length; this.cont_not++) {
              if (this.listaBimestreAux[this.cont].id === this.listaNotas[this.cont_not].id_Bimestre) {
                this.contador++;
                console.log(this.contador);
              }
            }

            if (3 >= this.contador) {
              this.bimestreaux = this.listaBimestreAux[this.cont];
              this.listaBimestre.push(this.bimestreaux);
            }
          }
          console.log(this.listaBimestre);
          if (this.listaBimestre.length === 0) {
            alert('Nenhum Bimestre Cadastrado Para o Aluno Atualmente');
          }

        }, error => {
          console.error(error);
          alert('Deu Erro na hora de validar Bimestre');
        });
      }
    }, error => {
      console.error(error);
      alert('Deu Erro na hora de Carregar Totos os itens');
    });
  }

}
