import { Component, OnInit } from '@angular/core';
import { Estados, Formato } from '../../shared/filtros-arrays';
import { PublicService } from '../services/public.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  selectedEstado?: string
  selectedCidade?: string;
  selectedFormato?: string;
  selectedProfissao?: string;
  selectedUF?: string;

  term: any
  contentArray: any = [];
  returnedArray: any = [];
  bairros: any = [];
  loading = false;
  messageEmpty = '';

  estados = Estados;
  cidades: any = [];
  formato = Formato;
  profissao: any = [];
  

  constructor(
    private publicService: PublicService,
    ) { }

  ngOnInit(): void {
    this.getUsersPagination();
  }

  onSelectCidade(event: any) {
    this.selectedUF = event.item.sigla;
    this.publicService.getCidadesIBGE(event.item.sigla).subscribe(cidades => {
      this.cidades = cidades;
    });
  }

  getUsersPagination(): void {
    this.publicService.getUsersClient().subscribe(users => {
      this.contentArray = users.filter((u: any) => 
      u.nomeCompleto !== '' && u.nomeSocial !== '' 
      && u.profissao !== '' && u.formatoAtendimento !== ''
      && u.breveDescricao !== '' && u.cidade !== '' && u.estado !== '');

      this.returnedArray = this.contentArray.slice(0, 6);

      /*users.map((u: any) => {
        if (u.profissao.length !== 0) {
          this.profissao.push(u.profissao)
        }
      });*/
      this.profissao = ['Psicanálise', 'Psicologia', 'PCS - Práticas Integrativas', 'Medicinas Populares', 'Alimentação', 'Fisioterapia Pélvica',
    'Ginecologia', 'Obstetrícia', 'Doula', 'Parteria Tradicional', 'Sexóloga', 'Consultora em Saúde Sexual', 'Terapia Sexial', 'Terapia de Casal',
    'Terapia Família']
    });
  }

  pageChanged(event: PageChangedEvent): void {
    window.scrollTo(0, 0);
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;

    this.returnedArray = this.contentArray.slice(startItem, endItem);
  }

  getUsersFilters() {
    const filters = {
      uf: this.selectedUF,
      cidade: this.selectedCidade,
      formatoAtendimento: this.selectedFormato,
      profissao: this.selectedProfissao
    }
    this.publicService.getUsersFilters(filters).subscribe(users => {
      if (users) {
        
        this.contentArray = users.filter((u: any) => 
      u.nomeCompleto !== '' && u.nomeSocial !== '' 
      && u.profissao !== '' && u.formatoAtendimento !== ''
      && u.breveDescricao !== '' && u.cidade !== '' && u.estado !== '');

      this.returnedArray = this.contentArray.slice(0, 6);
      }
    });
  }

  setIdStorage(ID: any){
    localStorage.setItem('clientID', ID);
  }

}
