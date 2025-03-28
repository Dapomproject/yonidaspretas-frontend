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
  // Variáveis para armazenar os filtros selecionados
  selectedNome?: string; // Nome selecionado
  selectedEstado?: string  // Estado selecionado
  selectedCidade?: string; // Cidade selecionada
  selectedFormato?: string; // Formato de atendimento selecionado
  selectedProfissao?: string; // Profissão selecionada
  selectedUF?: string; // Unidade federativa selecionada

  term: any // Termo de busca (não usado diretamente no código fornecido)
  contentArray: any = []; // Armazena os dados dos usuários para exibição
  returnedArray: any = []; // Armazena os dados dos usuários que serão exibidos na página atual (com paginação)
  bairros: any = []; // Lista de bairros
  loading = false;  // Flag de carregamento
  messageEmpty = ''; // Mensagem exibida quando não há dados

  estados = Estados; // Lista de estados para o filtro
  cidades: any = []; // Lista de cidades associadas ao estado selecionado
  formato = Formato; // Lista de formatos de atendimento
  profissao: any = [];  // Lista de profissões
  expandedText = false; // Flag para controlar a expansão do texto
  
  constructor(
    private publicService: PublicService, // Injeção do serviço para interação com a API pública
    ) { }

  ngOnInit(): void {
    this.getUsersPagination(); // Chama o método para carregar os usuários na página ao inicializar
  }

  // Método para selecionar uma cidade e atualizar as cidades com base no estado selecionado
  onSelectCidade(event: any) {
    this.selectedUF = event.item.sigla;  // Atribui a sigla do estado
    this.publicService.getCidadesIBGE(event.item.sigla).subscribe(cidades => {
      this.cidades = cidades; // Atualiza a lista de cidades com base no estado selecionado
    });
  }

  // Método para carregar os usuários com paginação
  getUsersPagination(): void {
    this.publicService.getUsersClient().subscribe(users => {
       // Filtra os usuários com dados completos e status ativo (status == 1)
      this.contentArray = users.filter((u: any) => 
      u.nomeCompleto !== '' && u.nomeSocial !== '' 
      && u.profissao !== '' && u.formatoAtendimento !== ''
      && u.breveDescricao !== '' && u.cidade !== '' && u.estado !== ''
      && u.status == 1);

      this.returnedArray = this.contentArray.slice(0, 6); // Retorna os primeiros 6 usuários para exibição inicial

      // Define a lista de profissões
      this.profissao = ['Acupuntura', 'Aromaterapia', 'Arteterapia', 'Ayurveda', 'Alimentação', 'Consultora em Saúde Sexual',
      'Constelação Familiar', 'Doula', 'Fisioterapia Pélvica', 'Fitoterapia', 'Ginecologia', 'Medicina', 'Medicinas Populares', 'Massoterapia',
      'Meditação Guiada', 'Musicoterapia', 'Naturopatia', 'Obstetrícia', 'Psicanálise', 'Psicologia', 'PICS - Práticas Integrativas', 
      'Parteira Tradicional', 'Reiki', 'Sexóloga', 'Terapia Sexual', 'Terapia de Casal', 'Terapia Familia', 'Terapia Holística', 'Terapia Ocupacional'
      , 'Terapia de Florais', 'Yoga Terapêutica']
    });
  }

  // Método que é chamado quando a página de paginação é alterada
  pageChanged(event: PageChangedEvent): void {
    window.scrollTo(0, 950); // Rola a página até uma posição específica
    const startItem = (event.page - 1) * event.itemsPerPage;  // Define o item inicial para exibição
    const endItem = event.page * event.itemsPerPage; // Define o item final para exibição

    this.returnedArray = this.contentArray.slice(startItem, endItem); // Atualiza os itens exibidos com base na página selecionada
  }

    // Método para aplicar os filtros e buscar os usuários com base nos filtros selecionados
  getUsersFilters() {
    const filters = {
      nome: this.selectedNome, // Filtro de nome
      uf: this.selectedUF, // Filtro de UF (Unidade Federativa)
      cidade: this.selectedCidade,  // Filtro de cidade
      formatoAtendimento: this.selectedFormato, // Filtro de formato de atendimento
      profissao: this.selectedProfissao // Filtro de profissão
    }
    // Chama o serviço para obter os usuários filtrados
    this.publicService.getUsersFilters(filters).subscribe(users => {
      if (users) {
        // Filtra novamente os usuários para garantir que todos os campos necessários estão preenchidos
        this.contentArray = users.filter((u: any) => 
      u.nomeCompleto !== '' && u.nomeSocial !== '' 
      && u.profissao !== '' && u.formatoAtendimento !== ''
      && u.breveDescricao !== '' && u.cidade !== '' && u.estado !== '');
        // Atualiza a exibição com os primeiros 6 usuários filtrados
      this.returnedArray = this.contentArray.slice(0, 6);
      }
    });
  }

  // Salva o ID do cliente no armazenamento local
  setIdStorage(ID: any){
    localStorage.setItem('clientID', ID);
  }

}
