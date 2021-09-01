import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PesquisaComponent } from './pesquisa.component';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';


@NgModule({
    imports: [
        CommonModule,
        TableModule,
        CardModule,
        MenuModule,
        ButtonModule,
        FlexLayoutModule,
        PanelModule
    ],
    exports: [],
    declarations: [PesquisaComponent],
    providers: [],
})
export class PesquisaModule { }