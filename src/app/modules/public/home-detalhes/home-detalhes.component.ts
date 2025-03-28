import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PublicService } from '../services/public.service';

@Component({
  selector: 'app-home-detalhes',
  templateUrl: './home-detalhes.component.html',
  styleUrls: ['./home-detalhes.component.scss']
})
export class HomeDetalhesComponent {
  userLogged$: Observable<any> | any; // Define uma variável para armazenar os dados do usuário logado, usando Observable para gerenciamento assíncrono
  contentArray: any = []; // Define uma variável para armazenar os detalhes do cliente (dados recebidos da API)

  constructor(
    private publicService: PublicService, // Injeção de dependência do serviço público que interage com a API
  ) {}

  ngOnInit(): void {
    this.getClientDetail(); // Chama o método para buscar os detalhes do cliente assim que o componente for inicializado
  }

    // Método para buscar os detalhes do cliente usando o ID armazenado no localStorage
  getClientDetail() {
    const ID: any = localStorage.getItem('clientID'); // Recupera o ID do cliente do localStorage
      
    this.publicService.getUsersClientById(ID).subscribe(client => {
      this.contentArray = client; // Armazena os dados do cliente retornados pela API na variável contentArray
    });
  }


}
