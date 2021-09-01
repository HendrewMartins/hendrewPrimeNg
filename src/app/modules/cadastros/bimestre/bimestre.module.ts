import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BimestreRoutingModule } from './bimestre-routing.module';
import { BimestreComponent } from './bimestre.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormularioModule } from '../../formulario/formulario.module';
import { PesquisaModule } from '../../pesquisa/pesquisa.module';
import { PrimeNgModule } from '../../primeng.module';


@NgModule({
  declarations: [BimestreComponent],
  imports: [
    CommonModule,
    BimestreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    FlexLayoutModule,
    FormularioModule,
    PesquisaModule,
  ]
})
export class BimestreModule { }
