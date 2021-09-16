import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BimestreService } from 'src/app/services/bimestre.service';
import { environment } from 'src/environments/environment';
import { Alunos } from './models/alunos';
import { Bimestre } from './models/bimestre';
import { DropBimestre } from './models/dropbimestre';


@Component({
  selector: 'app-bimestre',
  templateUrl: './bimestre.component.html',
  styleUrls: ['./bimestre.component.css'],
  providers: [BimestreService]
})

export class BimestreComponent implements OnInit {

  public form!: FormGroup;
  public urlAlunos: string;
  public urlBimestreAluno: string;
  public listaAlunos: Alunos[] = [];
  public listaFiltradaAlunos: Alunos[] = [];
  public listaBimestre: Bimestre[] = [];
  public cont: number = 0;
  public dropBimestre!: DropBimestre[]; 
  public selectedBimestre!: DropBimestre;
  public selectedAluno!: Alunos;

  public carregar: boolean = true;
  public pesquisaCar: boolean = true;
  private subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    public service: BimestreService,
    public http: HttpClient,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.urlAlunos = environment.api + '/api/alunos';
    this.urlBimestreAluno = environment.api + '/api/bimestre/aluno';
    this.dropBimestre = [
      {id: 1, bimestre: '1º Bimestre'},
      {id: 2, bimestre: '2º Bimestre'},
      {id: 3, bimestre: '3º Bimestre'},
      {id: 4, bimestre: '4º Bimestre'}
  ];
    this.criarForm();
  }

  ngOnInit() {
    this.subscription = this.route.data.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      const dados = params;
      console.log(dados.pathApi);
      if (dados.pathApi === 'bimestre') {

        this.pesquisaCar = true;
        this.router.navigate(['pesquisa'], { relativeTo: this.route.parent });

      } else {

        this.pesquisaCar = false;
        this.buscarAlunos();
      }
    });

    
  }
  public criarForm(): void {
    // tslint:disable-next-line: max-line-length
    this.form = this.fb.group({
      bimestre: [null, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(1)
      ])],
      ano: [null, Validators.compose([
        Validators.required,
        Validators.min(2000),
        Validators.max(2050)
      ])],
      faltas: [null, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(2)
      ])],
      id_Aluno: [null, Validators.compose([
        Validators.required
      ])],
    });

  }

  public get bimestre() {
    return this.form.get('bimestre') as FormGroup;
  }

  public get ano() {
    return this.form.get('ano') as FormGroup;
  }

  public get faltas() {
    return this.form.get('faltas') as FormGroup;
  }

  public get id_Aluno() {
    return this.form.get('id_Aluno') as FormGroup;
  }

  public buscarTodosAlunos(): Observable<Alunos[]> {
    return this.http.get<Alunos[]>(this.urlAlunos).pipe(map((item: Alunos[]) => {
      return item;
    }));

  }

  private buscarAlunos() {
    // tslint:disable-next-line: deprecation
    this.buscarTodosAlunos().subscribe((registro: Alunos[]) => {
      this.listaAlunos = registro;
      console.log(registro);
      this.carregar = false;
    }, error => {
      console.error(error);
      alert('Deu Erro na hora de Carregar Totos os itens');
    });
  }

  public buscarTodosBimestrePorAluno(value: any): Observable<Bimestre[]> {
    return this.http.get<Bimestre[]>(this.urlBimestreAluno + '/' + value).pipe(map((item: Bimestre[]) => {
      return item;
    }));
  }


  public validaBimestreExistente(id_aluno: number, id_bimestre: number, ano_escol: number) {
    if ((id_aluno > 0) && (id_bimestre > 0) && (ano_escol > 1999)) {
      this.buscarTodosBimestrePorAluno(id_aluno).subscribe((registro: Bimestre[]) => {
        this.listaBimestre = registro;
        console.log(registro);
        for (this.cont = 0; this.cont < this.listaBimestre.length; this.cont++) {
          if ((this.listaBimestre[this.cont].id_Aluno === id_aluno)
            && (this.listaBimestre[this.cont].bimestre === id_bimestre)
            && (this.listaBimestre[this.cont].ano === ano_escol)) {
            alert('O Bimestre ' + id_bimestre + '° para o Ano de ' + ano_escol + ' já existe para o Aluno Selecionado');
            this.form.reset;
            this.form.patchValue({
              ano: '',
              bimestre: 0
            });
            break;
          }
        }
      }, error => {
        console.error(error);
        alert('Deu Erro na hora de Carregar Totos os itens');
      });
    }
  }

  public validaAno() {
    const id_aluno = this.form.controls['id_Aluno'].value;
    const id_bimestre = this.form.controls['bimestre'].value;
    const ano_escol = this.form.controls['ano'].value;
    this.validaBimestreExistente(id_aluno, id_bimestre, ano_escol);
  }

  public validaAluno(id_alunos: any) {
    const id_aluno = id_alunos;
    const id_bimestre = this.form.controls['bimestre'].value;
    const ano_escol = this.form.controls['ano'].value;
    this.validaBimestreExistente(id_aluno, id_bimestre, ano_escol);
  }

  public validaBimestre(bimestre: any) {
    console.log(bimestre);
    const id_aluno = this.form.controls['id_Aluno'].value;
    const id_bimestre = bimestre;
    const ano_escol = this.form.controls['ano'].value;
    this.validaBimestreExistente(id_aluno, id_bimestre, ano_escol);
  }

  public filtroAlunos(event: any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.listaAlunos.length; i++) {
      let aluno = this.listaAlunos[i];
      if (aluno.nome!.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(aluno);
      }
    }

    this.listaFiltradaAlunos = filtered;
  }

}

