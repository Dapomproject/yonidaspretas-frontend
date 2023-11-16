import { Component } from '@angular/core';
import { ModalComponent } from '../../shared/modal/modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, map, of } from 'rxjs';
import { PublicService } from '../../public/services/public.service';

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
  bsModalRef?: BsModalRef;
  gridData: any = [];
  colData = [];
  usuariosReprovaodos$: Observable<any> = of();

  constructor(
    private modalService: BsModalService,
    private publicService: PublicService
  ) { }

  ngOnInit() {
    this.colData = columnData;
    this.getUsuariosReprovados();
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

  getUsuariosReprovados() {
    this.usuariosReprovaodos$ = this.publicService.getUsersClient().pipe(map(u => u.filter((c: any) => c.status === 2)));
  }

  editGetEvent(event: any): void {

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
