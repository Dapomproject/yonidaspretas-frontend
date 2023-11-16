import { Component, OnInit } from '@angular/core';
import { Formato, Profissao } from '../../shared/filtros-arrays';
import { PublicService } from '../services/public.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  selectedEstado?: string;
  selectedCidade?: string;
  selectedFormato?: string;
  selectedProfissao?: string;

  term: any
  contentArray: any = [];
  returnedArray: any = [];
  bairros: any = [];
  loading = false;
  messageEmpty = '';

  estados = [];
  cidades = [];
  formato = Formato;
  profissao = Profissao;

  constructor(private publicService: PublicService) { }

  ngOnInit(): void {
    this.getUsersPagination();
    this.getEstados();
  }

  getEstados() {
    this.publicService.getEstadosIBGE().subscribe(estados => {
      this.estados = estados;
    });
  }

  onSelect(event: any) {
    this.publicService.getCidadesIBGE(event.item.sigla).subscribe(cidades => {
      this.cidades = cidades;
    });
  }

  getUsersPagination(): void {
    this.publicService.getUsersClient().subscribe(users => console.log(users))
    this.contentArray = [
      {
        ID: 1, 
        nome: 'José Ferreira da Silva', 
        nomeSocial: 'José Silva', 
        foto: 'assets/imgs/imagem-1.jpg', 
        profissao: 'Psicólogo', 
        endereco: '', 
        email: 'josesilva@gmail.com', 
        descricaoNegocio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        ID: 2, 
        nome: 'Bruna da Costa Santos', 
        nomeSocial: 'Bruna Santos', 
        foto: 'assets/imgs/imagem-2.jpg', 
        profissao: 'Terapeuta Complementar', 
        endereco: '', 
        email: 'bruna_santos@gmail.com', 
        descricaoNegocio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        ID: 3, 
        nome: 'Bruna da Costa Santos', 
        nomeSocial: 'Bruna Santos', 
        foto: 'assets/imgs/imagem-2.jpg', 
        profissao: 'Terapeuta Complementar', 
        endereco: '', 
        email: 'bruna_santos@gmail.com', 
        descricaoNegocio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        ID: 4, 
        nome: 'José Ferreira da Silva', 
        nomeSocial: 'José Silva', 
        foto: 'assets/imgs/imagem-1.jpg', 
        profissao: 'Psicólogo', 
        endereco: '', 
        email: 'josesilva@gmail.com', 
        descricaoNegocio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
    ]

    this.returnedArray = [
      {
        ID: 1, 
        nome: 'José Ferreira da Silva', 
        nomeSocial: 'José Silva', 
        foto: 'assets/imgs/imagem-1.jpg', 
        profissao: 'Psicólogo', 
        endereco: '', 
        email: 'josesilva@gmail.com', 
        descricaoNegocio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        ID: 2, 
        nome: 'Bruna da Costa Santos', 
        nomeSocial: 'Bruna Santos', 
        foto: 'assets/imgs/imagem-2.jpg', 
        profissao: 'Terapeuta Complementar', 
        endereco: '', 
        email: 'bruna_santos@gmail.com', 
        descricaoNegocio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        ID: 3, 
        nome: 'Bruna da Costa Santos', 
        nomeSocial: 'Bruna Santos', 
        foto: 'assets/imgs/imagem-2.jpg', 
        profissao: 'Terapeuta Complementar', 
        endereco: '', 
        email: 'bruna_santos@gmail.com', 
        descricaoNegocio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        ID: 4, 
        nome: 'José Ferreira da Silva', 
        nomeSocial: 'José Silva', 
        foto: 'assets/imgs/imagem-1.jpg', 
        profissao: 'Psicólogo', 
        endereco: '', 
        email: 'josesilva@gmail.com', 
        descricaoNegocio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        ID: 5, 
        nome: 'José Ferreira da Silva', 
        nomeSocial: 'José Silva', 
        foto: 'assets/imgs/imagem-1.jpg', 
        profissao: 'Psicólogo', 
        endereco: '', 
        email: 'josesilva@gmail.com', 
        descricaoNegocio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        ID: 6, 
        nome: 'Bruna da Costa Santos', 
        nomeSocial: 'Bruna Santos', 
        foto: 'assets/imgs/imagem-2.jpg', 
        profissao: 'Terapeuta Complementar', 
        endereco: '', 
        email: 'bruna_santos@gmail.com', 
        descricaoNegocio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        ID: 7, 
        nome: 'Bruna da Costa Santos', 
        nomeSocial: 'Bruna Santos', 
        foto: 'assets/imgs/imagem-2.jpg', 
        profissao: 'Terapeuta Complementar', 
        endereco: '', 
        email: 'bruna_santos@gmail.com', 
        descricaoNegocio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
      {
        ID: 8, 
        nome: 'José Ferreira da Silva', 
        nomeSocial: 'José Silva', 
        foto: 'assets/imgs/imagem-1.jpg', 
        profissao: 'Psicólogo', 
        endereco: '', 
        email: 'josesilva@gmail.com', 
        descricaoNegocio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
    ]
  }

  showMore() {
    let newLength = this.contentArray.length + 4;
    if (newLength > this.returnedArray.length) {
      newLength = this.returnedArray.length;
    }
    this.contentArray = this.returnedArray.slice(0, newLength);
  }

}
