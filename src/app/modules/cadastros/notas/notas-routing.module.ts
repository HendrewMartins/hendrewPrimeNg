import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PesquisaComponent } from '../../pesquisa/pesquisa.component';
import { PesquisaResolveService } from '../../pesquisa/services/pesquisa-resolve.service';
import { PESQUISA_NOTAS_CONFIG } from './core/notas-pesquisa-config';
import { NotasComponent } from './notas.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'pesquisa', pathMatch: 'full'
  },
  {
    path: 'pesquisa', component: PesquisaComponent,
    data: PESQUISA_NOTAS_CONFIG,
    resolve: {
      registros: PesquisaResolveService
    }
  },
  {
    path: 'novo', component: NotasComponent
  },
  {
    path: ':id', component: NotasComponent
  },
  {
    path: ':id/:delete', component: NotasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotasRoutingModule { }
