import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, map, of } from 'rxjs';
import { ModalComponent } from '../../shared/modal/modal.component';
import { PublicService } from '../../public/services/public.service';
import { ToastrService } from 'ngx-toastr';

// Definição das colunas da tabela (nome, e-mail, profissão)
const columnData: any = [
  { field: 'nomeSocial', header: 'Cliente' },
  { field: 'email', header: 'E-mail' },
  { field: 'profissao', header: 'Profissão' }
];

@Component({
  selector: 'app-usuarios-aprovados',
  templateUrl: './usuarios-aprovados.component.html',
  styleUrls: ['./usuarios-aprovados.component.scss']
})
export class UsuariosAprovadosComponent {
  
  // Variáveis e propriedades
  bsModalRef?: BsModalRef; // Referência para o modal
  gridData: any = []; // Dados a serem exibidos na tabela
  colData = []; // Dados das colunas para a tabela
  usuariosAprovados$: Observable<any> = of(); // Observable que contém a lista de usuários aprovados

    // Injeção de dependências no construtor
  constructor(
    private modalService: BsModalService, // Serviço para abrir modais
    private publicService: PublicService, // Serviço para consumir a API pública
    private toastr: ToastrService // Serviço de notificações Toast
  ) { }

  // Método de inicialização do componente
  ngOnInit() {
    this.colData = columnData; // Atribui as colunas definidas anteriormente
    this.getUsuariosAprovados(); // Chama o método para carregar os usuários aprovados
  }

  // Abre o modal para ver as respostas do formulário
  openDialogRespostas() {
    const initialState = {
      data: {
        modalType: 'RESPOSTAS', // Define o tipo de modal
        titleModal: 'Respostas do formulário' // Define o título do modal
      }
    };
    this.bsModalRef = this.modalService.show(
      ModalComponent,  // Abre o componente ModalComponent
      Object.assign({ initialState }, { class: 'modal-respostas' }), // Passa o estado inicial e a classe CSS para o modal
    );
  }

  // Método para buscar os usuários aprovados
  getUsuariosAprovados() {
    // Filtra os usuários aprovados (status 1)
    this.usuariosAprovados$ = this.publicService.getUsersClient().pipe(map(u => u.filter((c: any) => c.status === 1)));
  }

  // Método chamado ao clicar em um item para ver os detalhes do usuário
  detailsGetEvent(event: any): void {
    const initialState = {
      data: {
        modalType: 'PERFIL_USUARIO', // Define o tipo de modal
        dadosPerfil: event.data // Passa os dados do usuário para o modal
      }
    };
    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({ initialState }, { class: 'modal-aprovados' }),
    );
  }

  // Método para verificar ou remover a verificação do profissional
  verifyGetEvent(event: any): void {
    const dataUserUpdated = {
      ...event.data,
      profissionalVerificado: null
    }
    const formData = new FormData();

    // Verifica o status do profissional e atualiza a verificação
    if (event.data.profissional_verificado !== 1) {
      dataUserUpdated.profissionalVerificado = 1;  // Marca como verificado
      formData.append('formUsersClient', JSON.stringify(dataUserUpdated));
    } else {
      dataUserUpdated.profissionalVerificado = 2;  // Remove a verificação
      formData.append('formUsersClient', JSON.stringify(dataUserUpdated));
    }

    // Chama a API para atualizar o status de verificação do usuário
    this.publicService.updateVerifyedUserClient(event.data.ID, formData).subscribe(res => {
      this.getUsuariosAprovados(); // Atualiza a lista de usuários aprovados
      dataUserUpdated.profissionalVerificado === 1 ? 
      this.toastr.success('Profissional verificado com sucesso', '') : 
      this.toastr.success('Verificação removida', '') // Exibe notificação de sucesso
    }, (err) => {
      this.toastr.error('Ocorreu um erro ao executar ação, contate o administrador', ''); // Exibe notificação de erro
    });
  }

  // Método para excluir um usuário
  deleteGetEvent(event: any): void {

    const initialState = {
      data: {
        modalType: 'CONFIRM_DELETE',
        dados: event // Passa os dados do usuário para o modal
      }
    };
    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({ initialState }, { class: 'modal-confirm-delete' }),
    );

    // Atualiza a lista de usuários aprovados ao fechar o modal
    this.bsModalRef.onHide?.subscribe(() => {
      this.getUsuariosAprovados();
    });
  }

  
}
