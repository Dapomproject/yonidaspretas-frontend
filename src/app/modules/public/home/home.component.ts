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
  selectedNome?: string;
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
  expandedText = false;
  
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
      && u.breveDescricao !== '' && u.cidade !== '' && u.estado !== ''
      && u.status == 1);

      this.returnedArray = this.contentArray.slice(0, 6);

      this.profissao = ['Acupuntura', 'Aromaterapia', 'Arteterapia', 'Ayurveda', 'Alimentação', 'Consultora em Saúde Sexual',
      'Constelação Familiar', 'Doula', 'Fisioterapia Pélvica', 'Fitoterapia', 'Ginecologia', 'Medicina', 'Medicinas Populares', 'Massoterapia',
      'Meditação Guiada', 'Musicoterapia', 'Naturopatia', 'Obstetrícia', 'Psicanálise', 'Psicologia', 'PICS - Práticas Integrativas', 
      'Parteira Tradicional', 'Reiki', 'Sexóloga', 'Terapia Sexual', 'Terapia de Casal', 'Terapia Familia', 'Terapia Holística', 'Terapia Ocupacional'
      , 'Terapia de Florais', 'Yoga Terapêutica']
    });
  }

  pageChanged(event: PageChangedEvent): void {
    window.scrollTo(0, 950);
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;

    this.returnedArray = this.contentArray.slice(startItem, endItem);
  }

  getUsersFilters() {
    const filters = {
      nome: this.selectedNome,
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
