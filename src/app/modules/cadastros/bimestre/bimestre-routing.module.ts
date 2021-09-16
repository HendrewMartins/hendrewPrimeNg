import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PesquisaComponent } from '../../pesquisa/pesquisa.component';
import { PesquisaResolveService } from '../../pesquisa/services/pesquisa-resolve.service';
import { PESQUISA_BIMESTRE_CONFIG } from './core/bimestre-pesquisa-config';
import { BimestreComponent } from './bimestre.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'carregar', pathMatch: 'full'
  },
  {
    path: 'pesquisa', component: PesquisaComponent,
    data: PESQUISA_BIMESTRE_CONFIG,
    resolve: {
      registros: PesquisaResolveService
    }
  },
  {
    path: 'carregar', component: BimestreComponent,
    data: PESQUISA_BIMESTRE_CONFIG
  },
  {
    path: 'novo', component: BimestreComponent
  },
  {
    path: ':id', component: BimestreComponent
  },
  {
    path: ':id/:delete', component: BimestreComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BimestreRoutingModule { }
