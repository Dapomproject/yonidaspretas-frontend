import { Component, Input, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { PublicService } from '../../public/services/public.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() public gridData: any;
  @Input() public colData: any = [];
  @Input() public actions: any;
  @Input() public typeTable: string = '';

  @Output() detailBtnRespostas: Subject<any> = new Subject();
  @Output() updateBtn: Subject<any> = new Subject();
  @Output() editBtn: Subject<any> = new Subject();
  @Output() detailsBtn: Subject<any> = new Subject();
  @Output() deleteBtn: Subject<any> = new Subject();

  constructor(private publicService: PublicService) { }

  ngOnChanges(changes: SimpleChanges): void { }


  detailsBtnRespostas(event: any, index: any, data: any): void {
    this.detailBtnRespostas.next({ event, index, data });
  }

  updateBtnEvent(event: any, index: any, data: any, status: number) {
    this.updateBtn.next({ event, index, data, status });
  }

  editBtnEvent(event: any, index: any, data: any): void {
    this.editBtn.next({ event, index, data });
  }

  detailsBtnEvent(event: any, index: any, data: any): void {
    this.detailsBtn.next({ event, index, data });
  }

  deleteBtnEvent(event: any, index: any, data: any): void {
    this.deleteBtn.next({ event, index, data });
  }

  downloadFileBtn(record: any) {
   this.publicService.downloadPDF(record.file);
  }
}
