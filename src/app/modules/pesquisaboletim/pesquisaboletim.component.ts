import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColunaConfig } from './models/coluna-config';
import { PesquisaConfig } from './models/pesquisa-config';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-pesquisaboletim',
    templateUrl: 'pesquisaboletim.component.html',
    providers: [PesquisaboletimComponent],
    styleUrls: ['pesquisaboletim.component.css']
})

export class PesquisaboletimComponent implements OnInit {

    public displayedColumns: any = [];

    public colunas: ColunaConfig[];

    public dataSource: any = [];

    public registroAno: number = 2021;

    public url: string;

    public carregar: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
    ) {
        const config: PesquisaConfig = this.route.snapshot.data as any;
        this.displayedColumns = [...config.colunas.map(col => col.nome), 'action'];
        this.colunas = config.colunas;
        this.dataSource = config.registros;
        console.log(this.dataSource);
        this.url = environment.api + '/api/boletim/';
        
    }

    ngOnInit() { 
        this.carregar = false;
    }

    public buscarBoletim(event: any) {
        if (event.keyCode === 13 && this.registroAno > 2000 && this.registroAno < 3000) {
            console.log(this.registroAno)
            const config: PesquisaConfig = this.route.snapshot.data as any;
            config.ano = this.registroAno + "";
            this.displayedColumns = [...config.colunas.map(col => col.nome), 'action'];
            this.colunas = config.colunas;
            this.ler(this.registroAno).subscribe((registro: any[]) => {
                this.dataSource = registro;
                console.log(this.dataSource);
                console.log(registro);
            }, error => {
                console.error(error);
                alert('Deu Erro na hora de Carregar Totos os itens');
            });

        }
    }

    public ler(id: number): Observable<any[]> {
        return this.http.get<any[]>(this.url + id).pipe(map((item: any[]) => {
            return item;
        }));
    }
}
