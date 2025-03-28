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
  bsModalRef?: BsModalRef; // Modal ref para controlar modais
  selectedPhoto: any;  // Foto selecionada para upload
  highlightedImage = 'assets/imgs/user-empty.svg';  // Imagem padrão de avatar
  arrayServicosAdicionados: any = []; // Array de serviços adicionados pelo usuário
  currentUser: any = [];  // Dados do usuário logado

  estados = Estados;  // Lista de estados para preenchimento no formulário
  cidades: any = []; // Lista de cidades para preenchimento no formulário
  loading = false; // Indicador de carregamento para ações como envio de dados

  // Indicador de carregamento para ações como envio de dados
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

   // Lista de profissões para seleção
  profissao = ['Acupuntura', 'Aromaterapia', 'Arteterapia', 'Ayurveda', 'Alimentação', 'Consultora em Saúde Sexual',
    'Constelação Familiar', 'Doula', 'Doula', 'Fisioterapia Pélvica', 'Fitoterapia', 'Ginecologia', 'Medicina', 'Medicinas Populares', 'Massoterapia',
    'Meditação Guiada', 'Musicoterapia', 'Naturopatia', 'Obstetrícia', 'Psicanálise', 'Psicologia', 'PICS - Práticas Integrativas',
    'Parteira Tradicional', 'Reiki', 'Sexóloga', 'Terapia Sexual', 'Terapia de Casal', 'Terapia Familia', 'Terapia Holística', 'Terapia Ocupacional'
    , 'Terapia de Florais', 'Yoga Terapêutica'];

  constructor(
    private modalService: BsModalService, // Injeta o serviço de modal
    private publicService: PublicService, // Injeta o serviço público
    private fb: FormBuilder, // Injeta o FormBuilder para criação de formulários
    private loginService: LoginService, // Injeta o serviço de login
    private toastr: ToastrService, // Injeta o serviço de notificações
    private viacep: NgxViacepService, // Injeta o serviço de consulta de CEP
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getServicosAdicionados(); // Chama o método para obter serviços adicionados
    this.getDadosIniciaisCliente(); // Chama o método para obter dados iniciais do cliente
  }

  // Método para atualizar a lista de cidades quando o estado é alterado
  onSelectCidade(event: any) {
    this.publicService.getCidadesIBGE(this.updateClientForm.value.estado[1]).subscribe(cidades => {
      this.cidades = cidades;
    });
    this.updateClientForm.controls.uf.patchValue(this.updateClientForm.value.estado[1]);
  }

   // Método para exibir a pré-visualização da imagem selecionada
  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > 1000000) {  // Limita o tamanho da imagem a 1MB
        alert('ATENÇÃO: Selecione uma foto com tamanho menor ou igual a 1MB'); 
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (e: any) => this.highlightedImage = e.target.result;  // Define a imagem selecionada
        this.selectedPhoto = event.target.files[0]; // Armazena a foto selecionada
      }
      
    } else {
      this.highlightedImage = 'assets/imgs/user-empty.svg'; // Restaura a imagem padrão
      this.selectedPhoto = null; // Limpa a foto selecionada
    }
  }

   // Método para abrir o modal de cadastro de serviço
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

  // Método para obter e gerenciar os serviços adicionados
  getServicosAdicionados() {
    this.publicService.subjectServicos.subscribe((res: any) => {
      this.arrayServicosAdicionados.forEach((item: any, index: any) => {
        if (item === res) {
          this.arrayServicosAdicionados.splice(index, 1); // Remove o serviço se já estiver na lista
        }
      });
      this.arrayServicosAdicionados.push(res); // Adiciona o novo serviço
    });
  }

   // Método para editar um serviço
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

  // Método para remover um serviço
  removerSevico(index: any) {
    this.arrayServicosAdicionados.splice(index, 1); // Remove o serviço da lista
  }

   // Método para obter o endereço via CEP
  getAddressViaCep(): void {
    const CEP = this.updateClientForm.value.cep;

    this.viacep.buscarPorCep(CEP).pipe(
      catchError((error: CEPError) => {
        return EMPTY; // Retorna um Observable vazio em caso de erro
      })
    ).subscribe((endereco: Endereco) => {
      // Preenche o formulário com os dados do endereço obtido
      this.updateClientForm.controls.rua.setValue(endereco.logradouro);
      this.updateClientForm.controls.bairro.setValue(endereco.bairro);
    });
  }

   // Método para obter os dados iniciais do cliente
  getDadosIniciaisCliente() {
    forkJoin([this.loginService.getUser()]).subscribe(user => {
      this.publicService.getUsersClientById(user[0]?.usuarioID).subscribe(res => {
        if (res[0]) {
          this.currentUser = res[0]; // Armazena os dados do cliente
          this.updateClientForm.patchValue(res[0]);  // Preenche o formulário com os dados do cliente

          setTimeout(() => {
            this.publicService.getCidadesIBGE(this.updateClientForm.value.uf).subscribe(cidades => {
              this.cidades = cidades; // Obtém as cidades do estado
            });
          });

          if (res[0]?.produtosServicos) {
            this.arrayServicosAdicionados = res[0]?.produtosServicos; // Preenche os serviços adicionados
          }
          // Verifica se o avatar está definido e atualiza a imagem do usuário
          res[0]?.avatar && res[0]?.avatar !== 'undefined' ? this.highlightedImage = res[0]?.avatar : this.highlightedImage = 'assets/imgs/user-empty.svg';
        }
      });
    });
  }

  // Método para atualizar os dados do cliente
  updateClient() {
    this.loading = true; // Ativa o carregamento
    const formData = new FormData();
    if (this.selectedPhoto) {
      formData.append('avatar', this.selectedPhoto); // Adiciona a foto ao FormData
    }

    this.updateClientForm.controls.produtosServicos.patchValue(this.arrayServicosAdicionados); // Atualiza os serviços

    formData.append('formUsersClient', JSON.stringify(this.updateClientForm.value)); // Adiciona os dados do formulário ao FormData
    this.publicService.updateUserClient(this.updateClientForm.value.ID, formData).subscribe(() => {
      this.loading = false;  // Desativa o carregamento
      this.toastr.success('Dados atualizados com sucesso!', ''); // Exibe notificação de sucesso
      window.scrollTo(0, 0);  // Rola a página para o topo
    }, (err) => {
      this.loading = false; // Desativa o carregamento em caso de erro
      this.toastr.error('Ocorreu um erro ao executar ação, contate o suporte@dapom.com.br', ''); // Exibe notificação de erro
    });
  }

}
