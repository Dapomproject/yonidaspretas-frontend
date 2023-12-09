import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from 'src/app/modules/shared/modal/modal.component';
import { PublicService } from '../../services/public.service';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/modules/login/services/login.service';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Estados } from 'src/app/modules/shared/filtros-arrays';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.scss']
})
export class MinhaContaComponent implements OnInit, AfterViewInit {
  bsModalRef?: BsModalRef;
  selectedPhoto: any;
  highlightedImage = 'assets/imgs/user-empty.svg';
  arrayServicosAdicionados: any = [];
  currentUser: any = [];

  estados = Estados;
  cidades: any = [];

  updateClientForm: UntypedFormGroup = this.fb.group({
    ID: [],
    nomeCompleto: [''],
    nomeSocial: [''],
    avatar: [''],
    email: ['', [Validators.required, Validators.email]],
    profissao: [''],
    celular: ['', Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)],
    breveDescricao: [''],
    descricaoCompleta: [''],
    produtosServicos: [''],
    formatoAtendimento: [''],
    file: [''],
    linkInstagram: [''],
    linkFacebook: [''],
    linkLinkedin: [''],
    respostas: [''],
    cep: [''],
    rua: [''],
    numero: [''],
    complemento: [''],
    bairro: [''],
    estado: [''],
    cidade: [''],
    uf: [''],
    status: [],
  });

  constructor(
    private modalService: BsModalService,
    private publicService: PublicService,
    private fb: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getServicosAdicionados();
    this.getDadosIniciaisCliente();
  }

  onSelectCidade(event: any) {
    console.log(event.target.value)
    this.publicService.getCidadesIBGE(this.updateClientForm.value.estado[1]).subscribe(cidades => {
      this.cidades = cidades;
    });
    this.updateClientForm.controls.uf.patchValue(this.updateClientForm.value.estado[1]);
  }

  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.highlightedImage = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedPhoto = event.target.files[0];
    } else {
      this.highlightedImage = 'assets/imgs/user-empty.svg';
      this.selectedPhoto = null;
    }
  }

  openModalCadastroServico() {
    const initialState = {
      data: {
        modalType: 'CADASTRO_SERVICOS',
        titleModal: 'Adicionar Serviço'
      }
    };
    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({ initialState }, { class: 'modal-register-client' }),
    );
  }

  getServicosAdicionados() {
    this.publicService.subjectServicos.subscribe((res: any) => {
      this.arrayServicosAdicionados.push(res);
    });
  }

  removerSevico(index: any) {
    this.arrayServicosAdicionados.splice(index, 1);
  }

  getDadosIniciaisCliente() {
    forkJoin([this.loginService.getUser()]).subscribe(user => {
      this.publicService.getUsersClientById(user[0]?.usuarioID).subscribe(res => {
        if (res[0]) {
          
          this.updateClientForm.patchValue(res[0]);
          setTimeout(() => {
            this.publicService.getCidadesIBGE(this.updateClientForm.value.estado[1]).subscribe(cidades => {
              this.cidades = cidades;
            });
          });
          
          if(res[0]?.produtosServicos) {
            this.arrayServicosAdicionados = res[0]?.produtosServicos;
          }
          res[0]?.avatar !== 'undefined' ? this.highlightedImage = res[0]?.avatar : this.highlightedImage = 'assets/imgs/user-empty.svg';
        }
      });
    });
  }

  updateClient() {
    const formData = new FormData();
    if (this.selectedPhoto) {
      formData.append('avatar', this.selectedPhoto);
    }

    this.updateClientForm.controls.produtosServicos.patchValue(this.arrayServicosAdicionados);

    formData.append('formUsersClient', JSON.stringify(this.updateClientForm.value));
    this.publicService.updateUserClient(this.updateClientForm.value.ID, formData).subscribe(() => {
      this.toastr.success('Dados atualizados com sucesso!', '');
      window.scrollTo(0, 0);
    }, (err) => {
      this.toastr.error('Ocorreu um erro ao executar ação, contate o administrador', '');
    });
  }

}
