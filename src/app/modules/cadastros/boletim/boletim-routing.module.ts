import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PesquisaboletimComponent } from '../../pesquisaboletim/pesquisaboletim.component';
import { PesquisaResolveService } from '../../pesquisaboletim/services/pesquisa-resolve.service';
import { PESQUISA_BOLETIM_CONFIG } from './core/boletim-pesquisa-config';

const routes: Routes = [
  {
    path: '', redirectTo: 'pesquisa', pathMatch: 'full'
  },
  {
    path: 'pesquisa', component: PesquisaboletimComponent,
    data: PESQUISA_BOLETIM_CONFIG,
    resolve: {
      registros: PesquisaResolveService
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoletimRoutingModule { }
