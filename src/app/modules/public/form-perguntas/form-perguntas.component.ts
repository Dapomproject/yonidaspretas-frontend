import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PublicService } from '../services/public.service';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Estados } from '../../shared/filtros-arrays';
import { CEPError, Endereco, NgxViacepService } from '@brunoc/ngx-viacep';
import { EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'app-form-perguntas',
  templateUrl: './form-perguntas.component.html',
  styleUrls: ['./form-perguntas.component.scss']
})
export class FormPerguntasComponent {

  // Usando ViewChildren para capturar elementos do DOM em componentes filhos (checkboxes).
  @ViewChildren('check') check!: QueryList<ElementRef>;

  // Variáveis para controle de imagem
  highlightedImage = 'assets/imgs/placeholder.jpg'; // Imagem padrão
  selectedImage: any; // Imagem selecionada

  // Objeto para armazenar as respostas do formulário
  changeRespostas = {
    resposta1: '',
    resposta2: '',
    resposta3: '',
    resposta4: '',
    resposta5: '',
    resposta6: '',
    resposta7: '',
    resposta8: '',
    resposta9: '',
    resposta10: '',
    resposta11: '',
    resposta12: '',
    resposta13: '',
    resposta14: ''
  }

  // Arrays para armazenar as respostas de múltipla escolha
  optionsResposta9: any = [];
  optionsResposta10: any = [];
  optionsResposta11: any = [];
  optionsResposta14: any = [];

  // Definição do formulário reativo
  regiterClientForm: UntypedFormGroup = this.fb.group({
    ID: [],
    nomeCompleto: ['', Validators.required],
    nomeSocial: ['', Validators.required],
    genero: [''],
    avatar: [''],
    email: ['', [Validators.required, Validators.email]],
    profissao: [''],
    celular: ['', Validators.required],
    breveDescricao: ['', Validators.required],
    descricaoCompleta: ['', Validators.required],
    produtosServicos: [''],
    formatoAtendimento: ['', Validators.required],
    file: [''],
    linkInstagram: [''],
    linkFacebook: [''],
    linkLinkedin: [''],
    respostas:[''],
    cep: [''],
    rua: [''],
    numero: [''],
    complemento: [''],
    estado: [''],
    bairro: [''],
    cidade: [''],
    uf: [''],
    pais: [''],
    status: [],
    profissionalVerificado: [],
  });

  selectedFile: any; // Arquivo de imagem selecionado para upload
  submitted = false; // Flag para indicar se o formulário foi enviado
  selectedEstado?: string // Estado selecionado
  selectedCidade?: string;  // Cidade selecionada
  selectedUF?: string; // Unidade federativa (estado) selecionada
  estados = Estados; // Lista de estados
  cidades: any = []; // Lista de cidades para o estado selecionado

  constructor(
    private fb: FormBuilder, // Injeção do FormBuilder para criar o formulário reativo
    private modalService: BsModalService, // Injeção do serviço de modal
    public bsModalRef: BsModalRef, // Referência do modal
    private publicService: PublicService,  // Injeção do serviço público para interações com API
    private toastr: ToastrService,  // Injeção do serviço público para interações com API
    private viacep: NgxViacepService, // Injeção do serviço de toastr para notificações
  ) {

  }

  // Método para selecionar uma cidade com base no estado
  onSelectCidade(event: any) {
    this.selectedUF = event.item.sigla; // Atribui a sigla do estado
    this.publicService.getCidadesIBGE(event.item.sigla).subscribe(cidades => {
      this.cidades = cidades; // Atualiza as cidades com base no estado selecionado
    });
  }

  // Método para buscar o endereço via CEP usando o serviço viacep
  getAddressViaCep(): void {
    const CEP = this.regiterClientForm.value.cep; // Obtém o CEP do formulário

    // Chama o serviço de busca do viacep e trata erros
    this.viacep.buscarPorCep(CEP).pipe(
      catchError((error: CEPError) => {
        return EMPTY; // Retorna vazio em caso de erro
      })
    ).subscribe((endereco: Endereco) => {
       // Preenche automaticamente os campos de rua e bairro com os dados do endereço retornado
      this.regiterClientForm.controls.rua.setValue(endereco.logradouro);
      this.regiterClientForm.controls.bairro.setValue(endereco.bairro);
    });
  }

    // Métodos para alterar as respostas das perguntas (input de texto)
  changeResposta1(event: any){
    this.changeRespostas.resposta1 = event.target.value;
  }
  changeResposta2(event: any){
    this.changeRespostas.resposta2 = event.target.value;
  }
  changeResposta3(event: any){
    this.changeRespostas.resposta3 = event.target.value;
  }
  changeResposta4(event: any){
    this.changeRespostas.resposta4= event.target.value;
  }

   // Métodos para alterar as respostas das perguntas múltiplas (checkboxes)
  changeResposta9(event: any) {
    if(event.target.checked) {
      this.optionsResposta9.push(event.target.value) // Adiciona valor se o checkbox estiver marcado
    } else {
      let index = this.optionsResposta9.indexOf(event.target.value);
      if (index != -1) {
        this.optionsResposta9.splice(index, 1);  // Remove valor se o checkbox for desmarcado
      }
    }
    this.changeRespostas.resposta9 = this.optionsResposta9; // Atualiza a resposta no objeto
  }
  changeResposta10(event: any) {
    if(event.target.checked) {
      this.optionsResposta10.push(event.target.value)
    } else {
      let index = this.optionsResposta10.indexOf(event.target.value);
      if (index != -1) {
        this.optionsResposta10.splice(index, 1);
      }
    }
    this.changeRespostas.resposta10 = this.optionsResposta10;
  }
  changeResposta11(event: any) {
    if(event.target.checked) {
      this.optionsResposta11.push(event.target.value)
    } else {
      let index = this.optionsResposta11.indexOf(event.target.value);
      if (index != -1) {
        this.optionsResposta11.splice(index, 1);
      }
    }
    this.changeRespostas.resposta11 =  this.optionsResposta11;
  }
  changeResposta14(event: any) {
    if(event.target.checked) {
      this.optionsResposta14.push(event.target.value)
    } else {
      let index = this.optionsResposta14.indexOf(event.target.value);
      if (index != -1) {
        this.optionsResposta14.splice(index, 1);
      }
    }
    this.changeRespostas.resposta14 = this.optionsResposta14;
  }
   
   // Método para lidar com o upload de um arquivo de imagem
  changeSelectedFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader(); // Cria um FileReader para ler o arquivo
      reader.readAsDataURL(event.target.files[0]);  // Lê o arquivo como URL
      this.selectedFile = event.target.files[0];  // Armazena o arquivo selecionado
      this.submitted = false; // Reseta a flag de envio
    } else {
      this.selectedFile = null; // Se não houver arquivo, reseta
    }
  }

  // Método para submeter o formulário de cadastro
  submitRegisterClient() {
    // Define a flag de envio como verdadeira
    this.submitted = true;
    // Preenche os campos do formulário com as respostas armazenadas
    this.regiterClientForm.controls.genero.patchValue(this.changeRespostas.resposta1);
    this.regiterClientForm.controls.uf.patchValue(this.selectedUF);
    this.regiterClientForm.controls.respostas.patchValue(this.changeRespostas);
    this.regiterClientForm.controls.profissao.patchValue(this.changeRespostas.resposta11);

    const formData = new FormData(); // Cria um objeto FormData para envio de dados, incluindo arquivos
    
    // Se um arquivo foi selecionado, adiciona ao FormData
    if (this.selectedFile) {
      formData.append('arquivo', this.selectedFile);
    }
  
    // Valida se o formulário está preenchido corretamente
    if (
      this.regiterClientForm.valid && 
      this.selectedFile && 
      this.changeRespostas.resposta1 !== '' && 
      this.changeRespostas.resposta2 !== '' && 
      this.changeRespostas.resposta3 !== '' && 
      this.changeRespostas.resposta4 !== '' && 
      this.changeRespostas.resposta6 !== '' && 
      this.changeRespostas.resposta7 !== '' && 
      this.changeRespostas.resposta8 !== '' && 
      this.changeRespostas.resposta9 !== '' && 
      this.changeRespostas.resposta10 !== '' && 
      this.changeRespostas.resposta11 !== '' && 
      this.changeRespostas.resposta12 !== '' && 
      this.changeRespostas.resposta13 !== '' && 
      this.changeRespostas.resposta14 !== '') { // Verifica se todas as respostas estão preenchidas
  
      formData.append('formUsersClient', JSON.stringify(this.regiterClientForm.value)); // Adiciona o formulário no FormData
      // Chama o serviço para salvar os dados do cliente
      this.publicService.newUserClient(formData).subscribe({
       next: (res) => {
        if(res) {
          setTimeout(() => {
            this.resetInputs();  // Reseta os campos após o envio
            this.openDialogConfirmation(); // Abre a confirmação
            this.regiterClientForm.reset(); // Reseta o formulário
            this.submitted = false; // Reseta a flag de envio
            this.selectedFile = null; // Limpa o arquivo selecionado
          }, 500)
        }
       },
       error: (e) => {
          this.submitted = false; // Reseta a flag de envio
          this.toastr.error('Não é permitido caracteres especiais nos campos de texto. ex: "@!#$[{\/', '', {
            timeOut: 6000
          });
        }
      });
    } else {
      this.toastr.error('Preencha os campos obrigatórios'); // Exibe erro caso o formulário não esteja preenchido corretamente
    }
  }

   // Método para resetar os campos e respostas
  resetInputs() {
    this.changeRespostas.resposta5 = '';
    this.changeRespostas.resposta6 = '';
    this.changeRespostas.resposta7 = '';
    this.changeRespostas.resposta8 = '';
    this.changeRespostas.resposta12 = '';
    this.changeRespostas.resposta13 = '';
    this.check.forEach(item => {
      item.nativeElement.checked = false; // Desmarca todos os checkboxes
      item.nativeElement.value = ''; // Limpa os valores dos checkboxes
    });
  }

  // Método para abrir o modal de confirmação após o envio
  openDialogConfirmation() {
    const initialState = {
      data: {
        modalType: 'CONFIRMATION',  // Tipo de modal de confirmação
      }
    };
    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({ initialState }, { class: 'modal-register-client' }),  // Abre o modal com a classe personalizada
    );
  }


}
