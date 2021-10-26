import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportarComponent } from './importar.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'novo', pathMatch: 'full'
  },
  {
    path: 'novo', component: ImportarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportarRoutingModule { }
