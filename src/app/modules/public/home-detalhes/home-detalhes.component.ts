import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-detalhes',
  templateUrl: './home-detalhes.component.html',
  styleUrls: ['./home-detalhes.component.scss']
})
export class HomeDetalhesComponent {
  freelancerID: any;
  userLogged$: Observable<any> | any;
  freelancer: any[] = [];
  contentArray: any = [];

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.freelancerID = this.route.snapshot.paramMap.get('id');
    this.contentArray = [
      {
        ID: 1,
        nome: 'José Ferreira da Silva',
        nomeSocial: 'José Silva',
        foto: 'assets/imgs/imagem-1.jpg',
        profissao: 'Psicólogo',
        endereco: '',
        produtosServicos: {
          imagem1: 'assets/imgs/exemplo.jpg',
          titulo1: 'Análise Clínica',
          descricao1: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
          valor1: 'R$ 350,00',

          imagem2: 'assets/imgs/exemplo.jpg',
          titulo2: 'Função congnitiva',
          descricao2: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
          valor2: 'R$ 200,00',

          imagem3: 'assets/imgs/exemplo.jpg',
          titulo3: 'Tratamento de Ansiedade',
          descricao3: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
          valor3: 'R$ 650,00',

          imagem4: 'assets/imgs/exemplo.jpg',
          titulo4: 'Função congnitiva',
          descricao4: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
          valor4: 'R$ 980,00',

          imagem5: 'assets/imgs/exemplo.jpg',
          titulo5: 'Análise Clínica',
          descricao5: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
          valor5: 'R$ 1600,00',

          imagem6: 'assets/imgs/exemplo.jpg',
          titulo6: 'Função congnitiva',
          descricao6: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
          valor6: 'R$ 4180,00',
        },

        email: 'josesilva@gmail.com',
        nomeNegocio: 'Médico Psiquiatra',
        descricaoNegocio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
      },
    ]

  }


}
