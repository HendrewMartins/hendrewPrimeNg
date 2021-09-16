import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PesquisaComponent } from '../../pesquisa/pesquisa.component';
import { PesquisaResolveService } from '../../pesquisa/services/pesquisa-resolve.service';
import { PESQUISA_ALUNO_CONFIG } from './core/aluno-pesquisa-config';
import { AlunoComponent } from './aluno.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'carregar', pathMatch: 'full'
  },
  {
    path: 'pesquisa', component: PesquisaComponent,
    data: PESQUISA_ALUNO_CONFIG,
    resolve: {
      registros: PesquisaResolveService
    }
  },
  {
    path: 'carregar', component: AlunoComponent,
    data: PESQUISA_ALUNO_CONFIG
  },

  {
    path: 'novo', component: AlunoComponent
  },
  {
    path: ':id', component: AlunoComponent
  },
  {
    path: ':id/:delete', component: AlunoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlunoRoutingModule { }
