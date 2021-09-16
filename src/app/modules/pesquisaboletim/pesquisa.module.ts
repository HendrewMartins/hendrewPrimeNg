import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PesquisaboletimComponent } from './pesquisaboletim.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
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
        FormsModule,
        ProgressSpinnerModule
    ],
    exports: [],
    declarations: [PesquisaboletimComponent],
    providers: [],
})
export class PesquisaModule { }
