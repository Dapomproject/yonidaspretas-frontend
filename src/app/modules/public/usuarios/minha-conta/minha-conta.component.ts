import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from 'src/app/modules/shared/modal/modal.component';
import { PublicService } from '../../services/public.service';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/modules/login/services/login.service';
import { EMPTY, catchError, forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Estados } from 'src/app/modules/shared/filtros-arrays';
import { CEPError, Endereco, NgxViacepService } from '@brunoc/ngx-viacep';

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
  loading = false;

  updateClientForm: UntypedFormGroup = this.fb.group({
    ID: [],
    nomeCompleto: [''],
    nomeSocial: [''],
    genero: [''],
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
    profissionalVerificado: []
  });

  profissao = ['Acupuntura', 'Aromaterapia', 'Arteterapia', 'Ayurveda', 'Alimentação', 'Consultora em Saúde Sexual',
    'Constelação Familiar', 'Doula', 'Doula', 'Fisioterapia Pélvica', 'Fitoterapia', 'Ginecologia', 'Medicina', 'Medicinas Populares', 'Massoterapia',
    'Meditação Guiada', 'Musicoterapia', 'Naturopatia', 'Obstetrícia', 'Psicanálise', 'Psicologia', 'PICS - Práticas Integrativas',
    'Parteira Tradicional', 'Reiki', 'Sexóloga', 'Terapia Sexual', 'Terapia de Casal', 'Terapia Familia', 'Terapia Holística', 'Terapia Ocupacional'
    , 'Terapia de Florais', 'Yoga Terapêutica'];

  constructor(
    private modalService: BsModalService,
    private publicService: PublicService,
    private fb: FormBuilder,
    private loginService: LoginService,
    private toastr: ToastrService,
    private viacep: NgxViacepService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getServicosAdicionados();
    this.getDadosIniciaisCliente();
  }

  onSelectCidade(event: any) {
    this.publicService.getCidadesIBGE(this.updateClientForm.value.estado[1]).subscribe(cidades => {
      this.cidades = cidades;
    });
    this.updateClientForm.controls.uf.patchValue(this.updateClientForm.value.estado[1]);
  }

  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > 1000000) {
        alert('ATENÇÃO: Selecione uma foto com tamanho menor ou igual a 1MB');
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (e: any) => this.highlightedImage = e.target.result;
        this.selectedPhoto = event.target.files[0];
      }
      
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
      this.arrayServicosAdicionados.forEach((item: any, index: any) => {
        if (item === res) {
          this.arrayServicosAdicionados.splice(index, 1);
        }
      });
      this.arrayServicosAdicionados.push(res);
    });
  }

  editarSevico(index: any){
    const initialState = {
      data: {
        modalType: 'EDITAR_SERVICO',
        titleModal: 'Editar Serviço',
        dadosServico: this.arrayServicosAdicionados,
        indiceServico: index
      }
    };
    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({ initialState }, { class: 'modal-register-client' }),
    );
  }

  removerSevico(index: any) {
    this.arrayServicosAdicionados.splice(index, 1);
  }

  getAddressViaCep(): void {
    const CEP = this.updateClientForm.value.cep;

    this.viacep.buscarPorCep(CEP).pipe(
      catchError((error: CEPError) => {
        return EMPTY;
      })
    ).subscribe((endereco: Endereco) => {
      this.updateClientForm.controls.rua.setValue(endereco.logradouro);
      this.updateClientForm.controls.bairro.setValue(endereco.bairro);
    });
  }

  getDadosIniciaisCliente() {
    forkJoin([this.loginService.getUser()]).subscribe(user => {
      this.publicService.getUsersClientById(user[0]?.usuarioID).subscribe(res => {
        if (res[0]) {
          this.currentUser = res[0];
          this.updateClientForm.patchValue(res[0]);

          setTimeout(() => {
            this.publicService.getCidadesIBGE(this.updateClientForm.value.uf).subscribe(cidades => {
              this.cidades = cidades;
            });
          });

          if (res[0]?.produtosServicos) {
            this.arrayServicosAdicionados = res[0]?.produtosServicos;
          }
          res[0]?.avatar && res[0]?.avatar !== 'undefined' ? this.highlightedImage = res[0]?.avatar : this.highlightedImage = 'assets/imgs/user-empty.svg';
        }
      });
    });
  }

  updateClient() {
    this.loading = true;
    const formData = new FormData();
    if (this.selectedPhoto) {
      formData.append('avatar', this.selectedPhoto);
    }

    this.updateClientForm.controls.produtosServicos.patchValue(this.arrayServicosAdicionados);

    formData.append('formUsersClient', JSON.stringify(this.updateClientForm.value));
    this.publicService.updateUserClient(this.updateClientForm.value.ID, formData).subscribe(() => {
      this.loading = false;
      this.toastr.success('Dados atualizados com sucesso!', '');
      window.scrollTo(0, 0);
    }, (err) => {
      this.loading = false;
      this.toastr.error('Ocorreu um erro ao executar ação, contate o suporte@dapom.com.br', '');
    });
  }

}
