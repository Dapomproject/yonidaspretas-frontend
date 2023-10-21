import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RatingModule } from 'ngx-bootstrap/rating';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    RatingModule.forRoot(),
    PaginationModule.forRoot(),
    CollapseModule.forRoot(),
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [
    BsDropdownModule,
    RatingModule,
    PaginationModule,
    CollapseModule,
    TypeaheadModule,
    ModalModule
  ]
})
export class NgxBootstrapModule { }