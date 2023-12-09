import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EsqueciSenhaRoutingModule } from './esqueci-senha-routing.module';
import { EsqueciSenhaComponent } from './esqueci-senha.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EsqueciSenhaComponent
  ],
  imports: [
    CommonModule,
    EsqueciSenhaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EsqueciSenhaModule { }
