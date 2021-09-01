import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColunaConfig } from './models/coluna-config';
import { PesquisaConfig } from './models/pesquisa-config';


import { MenuItem, MessageService } from 'primeng/api';

@Component({
    selector: 'app-pesquisa',
    templateUrl: 'pesquisa.component.html',
    providers: [PesquisaComponent, MessageService],
    styleUrls: ['pesquisa.component.css']
})

export class PesquisaComponent implements OnInit {

    public displayedColumns: any = [];

    public colunas: ColunaConfig[];

    public dataSource: any = [];

    public items!: MenuItem[];

    constructor(
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        const config: PesquisaConfig = this.route.snapshot.data as any;
        this.displayedColumns = [...config.colunas.map(col => col.nome), 'action'];
        this.colunas = config.colunas;
        this.dataSource = config.registros;
        console.log(this.dataSource);
    }

    ngOnInit() {

    this.items = [{
            label: 'Options',
            items: [{
                label: 'Update',
                icon: 'pi pi-refresh',
                command: () => {
                    this.update();
                }
            },
            {
                label: 'Delete',
                icon: 'pi pi-times',
                command: () => {
                    this.delete();
                }
            }
            ]}
        ];
    }

    update() {
        this.messageService.add({severity:'success', summary:'Success', detail:'Data Updated'});
    }

    delete() {
        this.messageService.add({severity:'warn', summary:'Delete', detail:'Data Deleted'});
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

}
