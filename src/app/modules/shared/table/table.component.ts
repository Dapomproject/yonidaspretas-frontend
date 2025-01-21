import { Component, ElementRef, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { PublicService } from '../../public/services/public.service';
import { download, generateCsv, mkConfig } from 'export-to-csv';

const config = mkConfig({
  filename: '',
  fieldSeparator: ',',
  decimalSeparator: '.',
  showTitle: false,
  title: '',
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true,
});

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @ViewChild('table') table!: ElementRef;

  @Input() public gridData: any;
  @Input() public colData: any = [];
  @Input() public actions: any;
  @Input() public typeTable: string = '';

  @Output() detailBtnRespostas: Subject<any> = new Subject();
  @Output() updateBtn: Subject<any> = new Subject();
  @Output() editBtn: Subject<any> = new Subject();
  @Output() detailsBtn: Subject<any> = new Subject();
  @Output() deleteBtn: Subject<any> = new Subject();
  @Output() verifyBtn: Subject<any> = new Subject();
  verificado = [false];

  constructor(
    private publicService: PublicService,
  ) { }

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

  verifyEvent(event: any, index: any, data: any){
    if (event){
      this.verificado[index] = !this.verificado[index];
      this.verifyBtn.next({ event, index, data, verify: this.verificado[index] });
    }
  }

  exportAsCSV(): void {
    const convertToStrings = (obj: any): any => {
      const convertedObj: any = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          convertedObj[key] = (typeof obj[key] === 'object') ? JSON.stringify(obj[key]) : obj[key];
        }
      }
      return convertedObj;
    };
    const convertedData = this.gridData.map((item: any) => convertToStrings(item));

    if (this.gridData.length > 0 && this.typeTable === 'aprovados') {
      config.filename = 'usuarios_aprovados'
      const csv = generateCsv(config)(convertedData);
      download(config)(csv)

    } else if (this.gridData.length > 0 && this.typeTable === 'reprovados') {
      config.filename = 'usuarios_reprovados';
      const csv = generateCsv(config)(convertedData);
      download(config)(csv)
    }
  }
}
