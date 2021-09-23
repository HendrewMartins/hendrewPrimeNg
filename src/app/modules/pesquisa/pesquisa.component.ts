import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColunaConfig } from './models/coluna-config';
import { PesquisaConfig } from './models/pesquisa-config';


import { LazyLoadEvent, MenuItem, MessageService } from 'primeng/api';
import { Alunos } from '../cadastros/aluno/models/alunos';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AnyObject } from 'chart.js/types/basic';

@Component({
    selector: 'app-pesquisa',
    templateUrl: 'pesquisa.component.html',
    providers: [PesquisaComponent, MessageService],
    styleUrls: ['pesquisa.component.css'],

})

export class PesquisaComponent implements OnInit {

    public displayedColumns: any = [];

    public displayModal!: boolean;

    public colunas: ColunaConfig[];

    public dataSource: any = [];
    public dataLiz: any = [];

    public items!: MenuItem[];

    public visuInfo!: boolean;

    public totalRecords!: number;

    public loading!: boolean;

    public details!: Alunos;
    
    public pagina!: number;

    public carregar: boolean = true;

    public pathAPi: string;

    public id: number = 0;
    public nome: string = '';
    public dt_nasc: string = '';
    public nm_mae: string = '';
    public nm_pai: string = '';
    public matricula: string = '';
    public rg_aluno: string = '';
    public cpf: string = '';

    constructor(
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router,
        public http: HttpClient,
    ) {
        const config: PesquisaConfig = this.route.snapshot.data as any;
        this.displayedColumns = [...config.colunas.map(col => col.nome), 'action'];
        this.colunas = config.colunas;
        this.dataSource = config.registros;
        this.pathAPi = config.pathApi;
        this.pagina = config.pagina;
        if (config.pathApi === 'alunos') {
            this.visuInfo = true;
        } else {
            this.visuInfo = false;
        }
        console.log(this.visuInfo);



    }

    ngOnInit() {
        this.carregaQuantidade();
        this.loading = true;
        this.carregar = false;
    }

    update() {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
    }

    delete() {
        this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
    }

    public editar(value: any) {
        console.log(value);
        this.router.navigate([value], { relativeTo: this.route.parent });
    }

    public cadastrar() {
        this.router.navigate(['novo'], { relativeTo: this.route.parent });
    }

    public excluir(value: any) {
        this.router.navigate([value, 'delete'], { relativeTo: this.route.parent });
    }

    public carregaQuantidade(){
        this.carregaQuantDados().subscribe(registro => {
            this.totalRecords = registro;
            console.log('total ' +this.totalRecords)
        });
    }
    public  carregaQuantDados(): Observable<any>{
        return this.http.get<any>(environment.api +'/api/'+this.pathAPi+'/count').pipe(map((item: any) => {
            return item;
       }));
    }

    public  carregaPage(value: any): Observable<any[]>{
        return this.http.get<any[]>(environment.api +'/api/'+this.pathAPi+'/page/'+value).pipe(map((item: any) => {
            return item;
       }));
    }

    public showModalDialog(value: any) {
        this.dt_nasc = value.dt_nasc;
        this.nome = value.nome;
        this.id = value.id;
        this.nm_mae = value.nm_mae;
        this.nm_pai = value.nm_pai;
        this.matricula = value.matricula;
        this.cpf = value.cpf;
        this.rg_aluno = value.rg_aluno;
        this.displayModal = true;
    }

    public loadPage(event: LazyLoadEvent) {
        this.loading = true;
        if((event.first === 0) && ( this.pagina === 0)){
            setTimeout(() => {
                this.loading = false;
            }, 1000); 
        } else {
            this.pagina = (event.first! > 0)? event.first!/5: 0;
            this.carregaPage(this.pagina).subscribe(registro => {
                this.dataSource = registro;
                this.loading = false;
            });
        }

        
    }
}
