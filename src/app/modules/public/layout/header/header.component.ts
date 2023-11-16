import { Component, OnInit, Renderer2 } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from 'src/app/modules/shared/modal/modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  bsModalRef?: BsModalRef;
  scrollPosition: any;

  constructor(
    private renderer: Renderer2,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.renderer.listen(window, 'scroll', ($event) => {
      this.scrollPosition = window.scrollY;
    });
  }

  openDialogRegisterClient() {
    const initialState = {
      data: {
        modalType: 'REGISTER_CLIENT',
        titleModal: 'Pré cadastro'
      }
    };
    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({ initialState }, { class: 'modal-register-client' }),
    );
  }

}
