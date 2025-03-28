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
  bsModalRef?: BsModalRef; // Armazena a referência ao modal exibido
  scrollPosition: any;  // Variável que armazena a posição do scroll da janela
  hasLogged = false;  // Flag que indica se o usuário está logado ou não
  isCollapsed = true; // Variável que controla o estado de colapso de um menu (provavelmente um menu de navegação)

  constructor(
    private renderer: Renderer2, // Injeta o Renderer2 para manipulação de eventos do DOM
    private modalService: BsModalService, // Injeta o serviço de modais para controle da exibição de modais
    private authService: AuthService,  // Injeta o serviço de autenticação para verificar o status de login
    private loginService: LoginService // Injeta o serviço de login para gerenciar a ação de logout
  ) { }

  ngOnInit(): void {
     // Aqui, ele está configurando um ouvinte para o evento de scroll na janela
    this.renderer.listen(window, 'scroll', ($event) => {
      this.scrollPosition = window.scrollY; // Armazena a posição atual do scroll
    });

    // Verifica se o usuário está logado, com base no token armazenado
    if(this.authService.getToken() !== null) {
      this.hasLogged = true;  // Se houver token, o usuário está logado
    } else {
      this.hasLogged = false; // Se não houver token, o usuário não está logado
    }
  }

    // Método para abrir um modal de pré-cadastro de cliente
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

  // Chama o serviço de logout para encerrar a sessão do usuário
  logout() {
    this.loginService.logout();
  }

}
