import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, map, of } from 'rxjs';
import { ModalComponent } from '../../shared/modal/modal.component';
import { PublicService } from '../../public/services/public.service';

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
  bsModalRef?: BsModalRef;
  gridData: any = [];
  colData = [];
  usuariosAprovados$: Observable<any> = of();

  constructor(
    private modalService: BsModalService,
    private publicService: PublicService
  ) { }

  ngOnInit() {
    this.colData = columnData;
    this.getUsuariosCadastrados();
  }

  openDialogRespostas() {
    const initialState = {
      data: {
        modalType: 'RESPOSTAS',
        titleModal: 'Respostas do formulário'
      }
    };
    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({ initialState }, { class: 'modal-respostas' }),
    );
  }

  getUsuariosCadastrados() {
    this.usuariosAprovados$ = this.publicService.getUsersClient().pipe(map(u => u.filter((c: any) => c.status === 1)));
  }

  detailsGetEvent(event: any): void {
    const initialState = {
      data: {
        modalType: 'PERFIL_USUARIO',
        dadosPerfil: event.data
      }
    };
    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({ initialState }, { class: 'modal-aprovados' }),
    );
  }

  deleteGetEvent(event: any): void {
    const initialState = {
      data: {
        modalType: 'CONFIRM_DELETE',
      }
    };
    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({ initialState }, { class: 'modal-confirm-delete' }),
    );
  }
}
