import { Component, Input, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() public gridData: any;
  @Input() public colData: any = [];
  @Input() public actions: any;

  @Output() editBtn: Subject<any> = new Subject();
  @Output() deleteBtn: Subject<any> = new Subject();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {}


  editBtnEvent(event: any, index:any, data:any): void{
    this.editBtn.next({event, index, data});
  }

  deleteBtnEvent(event:any, index:any, data:any): void{
    this.deleteBtn.next({event, index, data});
  }
}
