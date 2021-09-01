import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErroPipe } from './pipes/erro.pipe';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CrudComponent } from './components/crud/crud.component';
import { PrimeNgModule } from '../primeng.module';



@NgModule({
  declarations: [ErroPipe, CrudComponent],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule
  ],
  exports: [
    ErroPipe,
    CrudComponent,
    PrimeNgModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule
  ]
})
export class FormularioModule { }
