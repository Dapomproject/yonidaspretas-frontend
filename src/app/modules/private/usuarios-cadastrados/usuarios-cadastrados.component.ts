import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Observable, map, of } from 'rxjs';
import { PublicService } from '../../public/services/public.service';
import { ToastrService } from 'ngx-toastr';

// Definindo a estrutura das colunas da tabela
const columnData: any = [
  { field: 'nomeSocial', header: 'Cliente' },
  { field: 'email', header: 'E-mail' },
  { field: 'profissao', header: 'Profissão' }
];

@Component({
  selector: 'app-usuarios-cadastrados',
  templateUrl: './usuarios-cadastrados.component.html',
  styleUrls: ['./usuarios-cadastrados.component.scss']
})
export class UsuariosCadastradosComponent implements OnInit {
  bsModalRef?: BsModalRef;  // Referência para o modal
  gridData: any = []; // Dados da tabela
  colData = [];  // Colunas da tabela
  usuariosCadastrados$: Observable<any> = of();  // Observable para armazenar os usuários cadastrados

  constructor(
    private modalService: BsModalService, // Serviço para gerenciar modais
    private publicService: PublicService, // Serviço para interagir com a API pública
    private toastr: ToastrService // Serviço para exibir notificações
  ) { }

   // Inicialização do component
  ngOnInit() {
    this.colData = columnData; // Configura as colunas da tabela
    this.getUsuariosCadastrados(); // Chama o método para carregar os usuários cadastrados
  }

  // Abre o modal para exibir as respostas de um formulário
  openDialogRespostas(dados: any) {
    const initialState = {
      data: {
        modalType: 'RESPOSTAS', // Tipo de modal
        titleModal: 'Respostas do formulário',  // Título do modal
        dadosResposta: dados // Dados das respostas
      }
    };
     // Exibe o modal com os dados passados
    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({ initialState }, { class: 'modal-respostas' }),
    );
  }

  // Método para carregar os usuários cadastrados
  getUsuariosCadastrados() {
    // Filtra os usuários com status 0 (cadastrados)
    this.usuariosCadastrados$ = this.publicService.getUsersClient().pipe(map(u => u.filter((c: any) => c.status === 0)));
  }

    // Método para atualizar o status do usuário (aprovar ou reprovar)
  updateGetEvent(event: any): void {
    const dataUserUpdated = {
      ...event.data,
      status: event.status
    }

    const formData = new FormData();
    formData.append('formUsersClient', JSON.stringify(dataUserUpdated)); // Cria um FormData com os dados atualizados

    // Chama o serviço para atualizar o status do usuário
    this.publicService.updateStatusUserClient(event.data.ID, formData).subscribe(res => {
      // Recarrega os usuários cadastrados após a atualização
      this.getUsuariosCadastrados();  
      // Exibe uma notificação dependendo do novo status do usuário
      event.status === 1 ? this.toastr.success('Usuário aprovado com sucesso', '') : this.toastr.success('Usuário reprovado', '')
    }, (err) => {
      // Exibe uma mensagem de erro se ocorrer algum problema na requisição
      this.toastr.error('Ocorreu um erro ao executar ação, contate o administrador', '');
    });

  }

  deleteGetEvent(event: any): void {

  }

}
