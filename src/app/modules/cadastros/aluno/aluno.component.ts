import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css'],
  providers: [AlunoService]
})
export class AlunoComponent implements OnInit {

  public form!: FormGroup;
  public carregar: boolean = true;
  public pesquisaCar: boolean = true;
  private subscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    public service: AlunoService,
    public http: HttpClient,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.criarForm();
  }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      const dados = params;
      console.log(dados.pathApi);
      if (dados.pathApi === 'alunos') {

        this.pesquisaCar = true;
        this.router.navigate(['pesquisa'], { relativeTo: this.route.parent });
      } else {

        this.carregar = false;
        this.pesquisaCar = false;

      }
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
    });



  }

  public get nome() {
    return this.form.get('nome') as FormGroup;
  }

  public get dt_nasc() {
    return this.form.get('dt_nasc') as FormGroup;
  }

  public get valor() {
    return this.form.get('dt_nasc')?.value;
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

}
