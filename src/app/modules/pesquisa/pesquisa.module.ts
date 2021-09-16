import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PesquisaComponent } from './pesquisa.component';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog'
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@NgModule({
    imports: [
        CommonModule,
        TableModule,
        CardModule,
        MenuModule,
        ButtonModule,
        FlexLayoutModule,
        PanelModule,
        DialogModule,
        ProgressSpinnerModule
    ],
    exports: [],
    declarations: [PesquisaComponent],
    providers: [],
})
export class PesquisaModule { }
