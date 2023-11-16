import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Observable, filter, map, of } from 'rxjs';
import { PublicService } from '../../public/services/public.service';
import { ToastrService } from 'ngx-toastr';

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
  bsModalRef?: BsModalRef;
  gridData: any = [];
  colData = [];
  usuariosCadastrados$: Observable<any> = of();

  constructor(
    private modalService: BsModalService,
    private publicService: PublicService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.colData = columnData;
    this.getUsuariosCadastrados();
  }

  openDialogRespostas(dados: any) {
    const initialState = {
      data: {
        modalType: 'RESPOSTAS',
        titleModal: 'Respostas do formulário',
        dadosResposta: dados
      }
    };
    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({ initialState }, { class: 'modal-respostas' }),
    );
  }

  getUsuariosCadastrados() {
    this.usuariosCadastrados$ = this.publicService.getUsersClient().pipe(map(u => u.filter((c: any) => c.status === 0)));
  }

  updateGetEvent(event: any): void {
    const dataUserUpdated = {
      ...event.data,
      status: event.status
    }

    const formData = new FormData();
    formData.append('formUsersClient', JSON.stringify(dataUserUpdated));

    this.publicService.updateUserClient(event.data.ID, formData).subscribe(res => {
      this.getUsuariosCadastrados();
      event.status === 1 ? this.toastr.success('Usuário aprovado com sucesso', '') : this.toastr.success('Usuário reprovado', '')
    }, (err) => {
      this.toastr.error('Ocorreu um erro ao executar ação, contate o administrador', '');
    });

  }

  deleteGetEvent(event: any): void {

  }

}
