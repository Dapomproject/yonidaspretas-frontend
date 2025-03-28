import { Component, ElementRef, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { PublicService } from '../../public/services/public.service';
import { download, generateCsv, mkConfig } from 'export-to-csv';

// Configuração padrão para exportação em CSV
const config = mkConfig({
  filename: '', // Nome do arquivo
  fieldSeparator: ',', // Separador de campos
  decimalSeparator: '.', // Separador decimal
  showTitle: false, // Não exibe título
  title: '', // Título
  useTextFile: false,  // Não usa arquivo de texto
  useBom: true, // Usa BOM (Byte Order Mark) para garantir que os caracteres especiais sejam exibidos corretamente
  useKeysAsHeaders: true, // Usa as chaves do objeto como cabeçalhos
});

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  // Referência ao elemento da tabela no template
  @ViewChild('table') table!: ElementRef;

  // Define entradas (Inputs) do componente para dados da tabela, colunas e ações
  @Input() public gridData: any;
  @Input() public colData: any = [];
  @Input() public actions: any;
  @Input() public typeTable: string = '';

  // Define saídas (Outputs) para emitir eventos quando ações específicas são realizadas
  @Output() detailBtnRespostas: Subject<any> = new Subject();
  @Output() updateBtn: Subject<any> = new Subject();
  @Output() editBtn: Subject<any> = new Subject();
  @Output() detailsBtn: Subject<any> = new Subject();
  @Output() deleteBtn: Subject<any> = new Subject();
  @Output() verifyBtn: Subject<any> = new Subject();
  verificado = [false]; // Estado de verificação, inicialmente falso

  constructor(
    private publicService: PublicService, // Injeta o serviço público para operações como download
  ) { }

  // Detecta mudanças nas entradas do componente
  ngOnChanges(changes: SimpleChanges): void { }

  // Emite evento para detalhes de um item
  detailsBtnRespostas(event: any, index: any, data: any): void {
    this.detailBtnRespostas.next({ event, index, data });
  }

  // Emite evento para atualização de um item
  updateBtnEvent(event: any, index: any, data: any, status: number) {
    this.updateBtn.next({ event, index, data, status });
  }

  // Emite evento para editar um item
  editBtnEvent(event: any, index: any, data: any): void {
    this.editBtn.next({ event, index, data });
  }

  // Emite evento para detalhes de um item
  detailsBtnEvent(event: any, index: any, data: any): void {
    this.detailsBtn.next({ event, index, data });
  }

  // Emite evento para excluir um item
  deleteBtnEvent(event: any, index: any, data: any): void {
    this.deleteBtn.next({ event, index, data });
  }
  // Realiza o download de um arquivo associado ao registro
  downloadFileBtn(record: any) {
    this.publicService.downloadPDF(record.file); // Chama o serviço público para realizar o download
  }

  // Alterna o estado de verificação de um item e emite um evento
  verifyEvent(event: any, index: any, data: any){
    if (event){
      this.verificado[index] = !this.verificado[index]; // Alterna o estado de verificação
      this.verifyBtn.next({ event, index, data, verify: this.verificado[index] }); // Emite o evento de verificação
    }
  }

  // Exporta os dados da tabela como CSV
  exportAsCSV(): void {
    // Função para converter objetos em strings
    const convertToStrings = (obj: any): any => {
      const convertedObj: any = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          // Converte objetos internos em strings
          convertedObj[key] = (typeof obj[key] === 'object') ? JSON.stringify(obj[key]) : obj[key];
        }
      }
      return convertedObj;
    };
    // Converte os dados da tabela para strings
    const convertedData = this.gridData.map((item: any) => convertToStrings(item));

    // Verifica se há dados na tabela e o tipo da tabela (aprovados ou reprovados)
    if (this.gridData.length > 0 && this.typeTable === 'aprovados') {
      config.filename = 'usuarios_aprovados' // Define o nome do arquivo para aprovados
      const csv = generateCsv(config)(convertedData); // Gera o CSV
      download(config)(csv) // Faz o download do arquivo CSV

    } else if (this.gridData.length > 0 && this.typeTable === 'reprovados') {
      config.filename = 'usuarios_reprovados'; // Define o nome do arquivo para reprovados
      const csv = generateCsv(config)(convertedData); // Gera o CSV
      download(config)(csv) // Faz o download do arquivo CSV
    }
  }
}
