import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';

// Define o tipo MIME para arquivos Excel (para CSV, usamos tipo similar de planilha)
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
// Define a extensão do arquivo CSV
const CSV_EXTENSION = '.csv';

@Injectable({
  providedIn: 'root'
})
export class PrivateService {

  constructor() { }

  // Método para salvar o conteúdo em formato CSV
  public saveAsCsvFile(buffer: any, fileName: string): void {
    // Cria um Blob a partir do conteúdo (buffer) e define o tipo como o tipo de arquivo Excel
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE // Define o tipo de conteúdo para o Excel
    });

    // Usa a biblioteca FileSaver para acionar o download do arquivo CSV
    FileSaver(data, fileName + '_export_' + new Date().getTime() + CSV_EXTENSION);
  }
}
