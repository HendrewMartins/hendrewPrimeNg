import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportarRoutingModule } from './importar-routing.module';
import { ImportarComponent } from './importar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormularioModule } from '../../formulario/formulario.module';
import { PesquisaModule } from '../../pesquisa/pesquisa.module';
import { PrimeNgModule } from '../../primeng.module';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [ImportarComponent],
  imports: [
    CommonModule,
    ImportarRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    FlexLayoutModule,
    FormularioModule,
    PesquisaModule,
    FileUploadModule,
    HttpClientModule
  ]
})
export class ImportarModule { }
