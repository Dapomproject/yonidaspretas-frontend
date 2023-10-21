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


@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    HomeDetalhesComponent,
    ReplacePipe
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxBootstrapModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class PublicModule { }
