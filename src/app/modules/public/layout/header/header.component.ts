import { Component, OnInit, Renderer2 } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { LoginService } from 'src/app/modules/login/services/login.service';
import { ModalComponent } from 'src/app/modules/shared/modal/modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  bsModalRef?: BsModalRef;
  scrollPosition: any;
  hasLogged = true;

  constructor(
    private renderer: Renderer2,
    private modalService: BsModalService,
    private authService: AuthService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.renderer.listen(window, 'scroll', ($event) => {
      this.scrollPosition = window.scrollY;
    });

    if(this.authService.getToken() !== null) {
      this.hasLogged = true;
    } else {
      this.hasLogged = false;
    }
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

  logout() {
    this.loginService.logout();
  }

}
