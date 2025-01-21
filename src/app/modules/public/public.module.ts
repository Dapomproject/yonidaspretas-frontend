import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxBootstrapModule } from '../shared/ngx-bootstrap.module';
import { HomeDetalhesComponent } from './home-detalhes/home-detalhes.component';
import { RouterModule } from '@angular/router';
import { ReplacePipe } from '../utils/replace.pipe';
import { MinhaContaComponent } from './usuarios/minha-conta/minha-conta.component';
import { TooltipDirective } from '../utils/tooltip.directive';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormPerguntasComponent } from './form-perguntas/form-perguntas.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    HomeDetalhesComponent,
    ReplacePipe,
    MinhaContaComponent,
    TooltipDirective,
    FormPerguntasComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxBootstrapModule,
    NgxMaskDirective, 
    NgxMaskPipe,
    NgxSkeletonLoaderModule,
    NgSelectModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    provideEnvironmentNgxMask(),
    provideNgxMask(),
  ]
})
export class PublicModule { }
