import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Api } from 'src/app/services/api';

@Component({
    selector: 'app-crud',
    templateUrl: './crud.component.html',
    styleUrls: ['./crud.component.css'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class CrudComponent implements OnInit, OnDestroy {

    @Input() public form!: NgForm;

    @Input() public titulo!: string;

    @Input() public api!: Api<any>;

    public registroId: number = 0;

    private subscription!: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        // tslint:disable-next-line: deprecation
        this.subscription = this.route.params.subscribe(params => {
            // tslint:disable-next-line: no-string-literal
            if(params['id']){
                this.ler(params['id']);
            }
            // tslint:disable-next-line: no-string-literal
            if (params['delete'] === 'delete') {
                this.deletar();
            }
        });
    }

    private ler(id: number) {
        if (id) {
            this.registroId = id;
            // tslint:disable-next-line: deprecation
            this.api.ler(id).subscribe(registro => {
                if (registro) {
                    this.form.form.patchValue(registro);
                }
            }, error => {
                console.error(error);
                alert('Não foi possível encontrar  o registro ' + id);
                this.abrirNovoRegistro();
            });
        }
    }

    public salvar() {
        if (this.form.valid) {
            if (this.registroId) {
                this.alterar();
            } else {
                this.criar();
            }
        }
    }

    private alterar() {
        const value = this.form.form.value;
        console.log(this.form.form.value);
        value.id = this.registroId;
        // tslint:disable-next-line: deprecation
        this.api.alterar(value, this.registroId).subscribe(registro => {
            if (registro) {
                this.form.form.patchValue(registro);
                alert(`Registro ${this.registroId} foi salvo com sucesso`);
            }
        }, error => {
            console.error(error);
            alert('Erro ao alterar o registro');
        });
    }

    private criar() {
        // tslint:disable-next-line: deprecation
        console.log(this.form.form.value);
        this.api.criar(this.form.form.value).subscribe((registro) => {
            // FIXME: Realizar ação após gravar o registro
            alert(`O registro com código ${registro.id} foi salvo com sucesso!`);
            this.limpar();

        }, error => {
            console.error(error);
            alert('Ocorreu um erro ao salvar o registro registro');
        });
    }

    public limpar() {
        if (this.registroId) {
            this.abrirNovoRegistro();
        } else {
            this.form.resetForm();
        }
    }

    private abrirNovoRegistro() {
        this.router.navigate(['novo'], { relativeTo: this.route.parent });
    }

    public deletar() {
        // tslint:disable-next-line: deprecation
        this.api.deletar(this.registroId).subscribe(() => {
            alert('Registro deletado com sucesso!');
            this.limpar();
        }, error => {
            console.error(error);
            alert('Ocorreu uma falha ao deletar o registro');
        });
    }

    public voltarPesquisa() {
        this.router.navigate(['carregar'], { relativeTo: this.route.parent });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
