import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlunoService } from 'src/app/services/aluno.service';
import { environment } from 'src/environments/environment';
import { ColunaConfig } from '../../pesquisa/models/coluna-config';
import { PesquisaConfig } from '../../pesquisa/models/pesquisa-config';
import { PESQUISA_ALUNO_ENDERECO_CONFIG } from './core/aluno-pesquisa-endereco-config';
import { PESQUISA_ALUNO_TELEFONE_CONFIG } from './core/aluno-pesquisa-telefone-config';
import { Alunos } from './models/alunos';
import { AlunosEndereco } from './models/alunosendereco';
import { AlunosTelefone } from './models/alunostelefone';
import { DropEndereco } from './models/dropTipoEndereco';
import { DropTelefone } from './models/dropTipoTelefone';



@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css'],
  providers: [AlunoService]
})
export class AlunoComponent implements OnInit {

  public form!: FormGroup;
  public formEndereco!: FormGroup;
  public formTelefone!: FormGroup;
  public carregar: boolean = true;
  public pesquisaCar: boolean = true;
  private subscription!: Subscription;
  public listEndereco: AlunosEndereco[]  = [];
  public listTelefone: AlunosTelefone[]  = [];
  public totalEndereco!: number;
  public totalTelefone!: number;
  public loadingEndereco!: boolean;
  public loadingTelefone!: boolean;
  public colunasEndereco!: ColunaConfig[];
  public colunasTelefone!: ColunaConfig[];
  public displayModalEndereco!: boolean;
  public displayModalTelefone!: boolean;
  public dropEndereco!: DropEndereco[];
  public dropTelefone!: DropTelefone[];
  public sitContato!: boolean;
  public urlAluno!: string;

  constructor(
    private fb: FormBuilder,
    public service: AlunoService,
    public http: HttpClient,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.urlAluno = environment.api + '/api/alunos';
    this.criarForm();

    this.criarFormEndereco();
    const confEndereco = PESQUISA_ALUNO_ENDERECO_CONFIG;
    this.colunasEndereco = confEndereco.colunas;

    this.criarFormTelefone();
    const confTelefone = PESQUISA_ALUNO_TELEFONE_CONFIG;
    this.colunasTelefone = confTelefone.colunas;

    this.dropEndereco = [
      { id: 'Residencial', tipo: 'Residencial' },
      { id: 'Comercial', tipo: 'Comercial' },
      { id: 'Correspondência', tipo: 'Correspondência' }
    ];

    this.dropTelefone = [
      { id: 'Celular', tipo: 'Celular' },
      { id: 'Fixo', tipo: 'Fixo' },
      { id: 'Contato', tipo: 'Contato' }
    ];

    this.sitContato = false;
  }

  ngOnInit(): void {
    this.carregar = true;
    this.subscription = this.route.params.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      this.leredit(params['id']);
    });

    this.subscription = this.route.data.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      const dados = params;
      console.log(dados.pathApi);
      if (dados.pathApi === 'alunos') {

        this.pesquisaCar = true;
        this.router.navigate(['pesquisa'], { relativeTo: this.route.parent });
      } else {
        this.pesquisaCar = false;
        this.carregar = false;
      }
    });
    this.loadingEndereco = false;
    this.loadingTelefone = false;


  }

  public leredit(value: number) {
    if (value) {
      this.ler(value).subscribe(registro => {
        const alunoDados = registro;
        console.log(alunoDados);
        this.listEndereco = alunoDados.alunos_endereco!;
        this.listTelefone = alunoDados.alunos_telefone!;
      }, error => {
        console.error(error);
      });
    } else {
      this.listEndereco = [];
      this.listTelefone = [];
    }
  }

  public ler(id: number): Observable<Alunos> {
    return this.http.get<Alunos>(this.urlAluno + '/id/' + id).pipe(map((item: any) => {
      return item;
    }));
  }

  public showModalDialogEndereco() {
    this.displayModalEndereco = true;
  }

  public geraSequenciaEndereco() {
    const quant = this.listEndereco.length;
    let seq: number = 0;
    if (quant > 0) {
      seq = this.listEndereco[quant - 1].sequencia + 1;
    } else {
      seq = 1;
    }
    this.formEndereco.patchValue({
      sequencia: seq
    });
  }

  public showModalDialogTelefone() {
    this.displayModalTelefone = true;
  }

  public geraSequenciaTelefone() {
    const quant = this.listTelefone.length;
    let seq: number = 0;
    if (quant > 0) {
      seq = this.listTelefone[quant - 1].sequencia + 1;
    } else {
      seq = 1;
    }
    this.formTelefone.patchValue({
      sequencia: seq
    });
  }

  public criarForm(): void {
    // tslint:disable-next-line: max-line-length
    this.form = this.fb.group({
      nome: [null, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)
      ])],
      dt_nasc: [null, Validators.compose([
        Validators.required
      ])],
      nm_mae: [null, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)
      ])],
      matricula: [null, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(15)
      ])],
      nm_pai: [null, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)
      ])],
      rg_aluno: [null, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20)
      ])],
      cpf: [null, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(15)
      ])],
      alunos_endereco: [null],
      alunos_telefone: [null],
    });
  }

  public criarFormTelefone(): void {
    // tslint:disable-next-line: max-line-length
    this.formTelefone = this.fb.group({
      sequencia: [null, Validators.compose([
        Validators.required
      ])],
      tipo: [null, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)
      ])],

      numero: [null, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)
      ])],

      contato: [null, Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(100)
      ])],
    });
  }

  public criarFormEndereco(): void {
    // tslint:disable-next-line: max-line-length
    this.formEndereco = this.fb.group({
      sequencia: [null, Validators.compose([
        Validators.required
      ])],
      tipo: [null, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)
      ])],
      logradouro: [null, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)
      ])],
      numero: [null, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)
      ])],
      bairro: [null, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)
      ])],
      cep: [null, Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)
      ])],
      complemento: [null, Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(100)
      ])],
    });
  }

  public get tipotelefone() {
    return this.formTelefone.get('tipo') as FormGroup;
  }

  public get numerotel() {
    return this.formTelefone.get('numero') as FormGroup;
  }

  public get contato() {
    return this.formTelefone.get('contato') as FormGroup;
  }

  public get tipoendereco() {
    return this.formEndereco.get('tipo') as FormGroup;
  }

  public get logradouro() {
    return this.formEndereco.get('logradouro') as FormGroup;
  }

  public get numero() {
    return this.formEndereco.get('numero') as FormGroup;
  }

  public get bairro() {
    return this.formEndereco.get('bairro') as FormGroup;
  }

  public get cep() {
    return this.formEndereco.get('cep') as FormGroup;
  }

  public get complemento() {
    return this.formEndereco.get('complemento') as FormGroup;
  }


  public get nome() {
    return this.form.get('nome') as FormGroup;
  }

  public get dt_nasc() {
    return this.form.get('dt_nasc') as FormGroup;
  }

  public get nm_mae() {
    return this.form.get('nm_mae') as FormGroup;
  }

  public get nm_pai() {
    return this.form.get('nm_pai') as FormGroup;
  }

  public get matricula() {
    return this.form.get('matricula') as FormGroup;
  }

  public get rg_aluno() {
    return this.form.get('rg_aluno') as FormGroup;
  }

  public get cpf() {
    return this.form.get('cpf') as FormGroup;
  }

  public mudaValor() {
    let dataForm: any = this.form.get('dt_nasc')?.value;
    if (dataForm !== null) {
      if (dataForm.length === 10) {
        this.form.patchValue({
          dt_nasc: dataForm
        });
      } else {

        let dataCalendar: Date = dataForm;
        const day = (dataCalendar.getDate() >= 10) ? dataCalendar.getDate() : "0" + dataCalendar.getDate();
        const month = ((dataCalendar.getMonth() + 1) >= 10) ? (dataCalendar.getMonth() + 1) : "0" + (dataCalendar.getMonth() + 1);
        const year = dataCalendar.getFullYear();
        const dataFormat = day + "/" + month + "/" + year;
        console.log(dataFormat);
        dataFormat;
        this.form.patchValue({
          dt_nasc: dataFormat
        });

      }
    }

  }
  public limparEndereco() {
    this.formEndereco.reset();
  }

  public limparTelefone() {
    this.formTelefone.reset();
  }

  public validaContato(value: any) {
    this.sitContato = (value === 'Contato') ? true : false;

  }

  public gravarEndereco() {
    this.geraSequenciaEndereco();
    if (this.formEndereco.valid) {
      let endereco: AlunosEndereco;
      const end = this.formEndereco.value;
      console.log(end);
      endereco = end;
      this.listEndereco.push(endereco);

      this.form.patchValue({
        alunos_endereco: this.listEndereco
      });

      this.formEndereco.reset();
    } else {
      alert('Ainda existe campos Obrigatorios');
    }
  }

  public gravarTelefone() {
    this.geraSequenciaTelefone();
    if (this.formTelefone.valid) {
      let telefone: AlunosTelefone;
      const fone = this.formTelefone.value;
      console.log(fone);
      telefone = fone;
      this.listTelefone.push(telefone);

      this.form.patchValue({
        alunos_telefone: this.listTelefone
      });

      this.formTelefone.reset();
    } else {
      alert('Ainda existe campos Obrigatorios');
    }
  }

  public removerEndereco(value: any) {
    console.log(value);
    var index = this.listEndereco.findIndex((ender) => ender.sequencia === value);
    console.log(index);
    if (index > -1) {
      this.listEndereco.splice(index, 1);
      this.ajustaSequenciaEndereco();

      this.form.patchValue({
        alunos_endereco: this.listEndereco
      });

    }
  }

  public ajustaSequenciaEndereco() {
    let auxlista: AlunosEndereco[] = this.listEndereco;
    const quant = auxlista.length;
    let cont;
    for (cont = 0; cont < quant; cont++) {
      auxlista[cont].sequencia = cont + 1;
    }
    this.listEndereco = auxlista;
  }


  public removerTelefone(value: any) {
    var index = this.listTelefone.findIndex((tele) => tele.sequencia === value);
    console.log(index);
    if (index > -1) {
      this.listTelefone.splice(index, 1);
      this.ajustaSequenciaTelefone();

      this.form.patchValue({
        alunos_telefone: this.listTelefone
      });

    }
  }

  public ajustaSequenciaTelefone() {
    let auxlista: AlunosTelefone[] = this.listTelefone;
    const quant = auxlista.length;
    let cont;
    for (cont = 0; cont < quant; cont++) {
      auxlista[cont].sequencia = cont + 1;
    }
    this.listTelefone = auxlista;
  }


}
