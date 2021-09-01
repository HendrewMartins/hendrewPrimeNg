import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotasRoutingModule } from './notas-routing.module';
import { NotasComponent } from './notas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../../primeng.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormularioModule } from '../../formulario/formulario.module';
import { PesquisaModule } from '../../pesquisa/pesquisa.module';




@NgModule({
  declarations: [NotasComponent],
  imports: [
    CommonModule,
    NotasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    FlexLayoutModule,
    FormularioModule,
    PesquisaModule,
  ]
})
export class NotasModule { }
