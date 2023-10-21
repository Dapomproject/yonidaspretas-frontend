import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { TableComponent } from './table/table.component';
import { TooltipDirective } from '../utils/tooltip.directive';

@NgModule({
  declarations: [
    ModalComponent,
    TableComponent,
    TooltipDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent,
    TableComponent
  ]
})
export class SharedModule { }
