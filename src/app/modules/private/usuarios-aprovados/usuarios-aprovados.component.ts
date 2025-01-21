import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, map, of } from 'rxjs';
import { ModalComponent } from '../../shared/modal/modal.component';
import { PublicService } from '../../public/services/public.service';
import { ToastrService } from 'ngx-toastr';

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
    private publicService: PublicService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.colData = columnData;
    this.getUsuariosAprovados();
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

  getUsuariosAprovados() {
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

  verifyGetEvent(event: any): void {
    const dataUserUpdated = {
      ...event.data,
      profissionalVerificado: null
    }
    const formData = new FormData();
    if (event.data.profissional_verificado !== 1) {
      dataUserUpdated.profissionalVerificado = 1;
      formData.append('formUsersClient', JSON.stringify(dataUserUpdated));
    } else {
      dataUserUpdated.profissionalVerificado = 2;
      formData.append('formUsersClient', JSON.stringify(dataUserUpdated));
    }

    this.publicService.updateVerifyedUserClient(event.data.ID, formData).subscribe(res => {
      this.getUsuariosAprovados();
      dataUserUpdated.profissionalVerificado === 1 ? 
      this.toastr.success('Profissional verificado com sucesso', '') : 
      this.toastr.success('Verificação removida', '')
    }, (err) => {
      this.toastr.error('Ocorreu um erro ao executar ação, contate o administrador', '');
    });
  }

  deleteGetEvent(event: any): void {

    const initialState = {
      data: {
        modalType: 'CONFIRM_DELETE',
        dados: event
      }
    };
    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({ initialState }, { class: 'modal-confirm-delete' }),
    );

    this.bsModalRef.onHide?.subscribe(() => {
      this.getUsuariosAprovados();
    });
  }

  
}
