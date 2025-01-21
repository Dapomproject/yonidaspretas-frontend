import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

const CSV_EXTENSION = '.csv';

@Injectable({
  providedIn: 'root'
})
export class PrivateService {

  constructor() { }

  public saveAsCsvFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });

    FileSaver(data, fileName + '_export_' + new Date().getTime() + CSV_EXTENSION);
  }
}
