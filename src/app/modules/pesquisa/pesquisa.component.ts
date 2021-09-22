import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColunaConfig } from './models/coluna-config';
import { PesquisaConfig } from './models/pesquisa-config';


import { LazyLoadEvent, MenuItem, MessageService } from 'primeng/api';
import { Alunos } from '../cadastros/aluno/models/alunos';

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

    public carregar: boolean = true;

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
    ) {
        const config: PesquisaConfig = this.route.snapshot.data as any;
        this.displayedColumns = [...config.colunas.map(col => col.nome), 'action'];
        this.colunas = config.colunas;
        this.dataSource = config.registros;
        this.totalRecords = this.dataSource.length;
        if (config.pathApi === 'alunos') {
            this.visuInfo = true;
        } else {
            this.visuInfo = false;
        }
        console.log(this.visuInfo);



    }

    ngOnInit() {
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

    showModalDialog(value: any) {
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

    loadCustomers(event: LazyLoadEvent) {
        this.loading = true;

        //in a real application, make a remote request to load data using state metadata from event
        //event.first = First row offset
        //event.rows = Number of rows per page
        //event.sortField = Field name to sort with
        //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
        //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

        //imitate db connection over a network
        setTimeout(() => {
            if (this.dataSource) {
                this.dataLiz = this.dataSource.slice(event.first, (event.first! + event.rows!));
                this.loading = false;
            }
        }, 1000);
    }
}
