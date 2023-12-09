import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EsqueciSenhaComponent } from './esqueci-senha.component';

const routes: Routes = [
  { path: '', component: EsqueciSenhaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EsqueciSenhaRoutingModule { }
