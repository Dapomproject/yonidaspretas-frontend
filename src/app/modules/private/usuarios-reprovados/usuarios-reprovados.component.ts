import { Component } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, map, of } from 'rxjs';
import { PublicService } from '../../public/services/public.service';

// Definindo a estrutura das colunas da tabela
const columnData: any = [
  { field: 'nomeSocial', header: 'Cliente' },
  { field: 'email', header: 'E-mail' },
  { field: 'profissao', header: 'Profissão' }
];

@Component({
  selector: 'app-usuarios-reprovados',
  templateUrl: './usuarios-reprovados.component.html',
  styleUrls: ['./usuarios-reprovados.component.scss']
})
export class UsuariosReprovadosComponent {
  bsModalRef?: BsModalRef; // Referência para o modal
  gridData: any = []; // Dados da tabela
  colData = []; // Colunas da tabela
  usuariosReprovaodos$: Observable<any> = of(); // Observable para armazenar os usuários reprovados

  constructor(
    private modalService: BsModalService,  // Serviço para gerenciar modais
    private publicService: PublicService // Serviço para interagir com a API pública
  ) { }

    // Inicialização do componente
  ngOnInit() {
    this.colData = columnData; // Configura as colunas da tabela
    this.getUsuariosReprovados(); // Chama o método para carregar os usuários reprovados
  }

    // Abre o modal para exibir as respostas de um formulário
  openDialogRespostas() {
    const initialState = {
      data: {
        modalType: 'RESPOSTAS',
        titleModal: 'Respostas do formulário'
      }
    };
    // Exibe o modal com os dados passados
    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({ initialState }, { class: 'modal-respostas' }),
    );
  }

  // Método para carregar os usuários reprovados
  getUsuariosReprovados() {
    // Filtra os usuários com status 2 (reprovados)
    this.usuariosReprovaodos$ = this.publicService.getUsersClient().pipe(map(u => u.filter((c: any) => c.status === 2)));
  }

  editGetEvent(event: any): void {}

  // Método para deletar um usuário
  deleteGetEvent(event: any): void {
    // Configura o estado inicial do modal de confirmação de exclusão
    const initialState = {
      data: {
        modalType: 'CONFIRM_DELETE',
      }
    };
     // Exibe o modal de confirmação de exclusão
    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({ initialState }, { class: 'modal-confirm-delete' }),
    );
  }
}
