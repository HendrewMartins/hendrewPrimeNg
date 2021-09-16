import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PesquisaboletimComponent } from '../../pesquisaboletim/pesquisaboletim.component';
import { PesquisaResolveService } from '../../pesquisaboletim/services/pesquisa-resolve.service';
import { BoletimComponent } from './boletim.component';
import { PESQUISA_BOLETIM_CONFIG } from './core/boletim-pesquisa-config';

const routes: Routes = [
  {
    path: '', redirectTo: 'carregar', pathMatch: 'full'
  },
  {
    path: 'pesquisa', component: PesquisaboletimComponent,
    data: PESQUISA_BOLETIM_CONFIG,
    resolve: {
      registros: PesquisaResolveService
    }
  },
  {
    path: 'carregar', component: BoletimComponent,
    data: PESQUISA_BOLETIM_CONFIG
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoletimRoutingModule { }
