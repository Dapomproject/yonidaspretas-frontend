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

  @ViewChildren('check') check!: QueryList<ElementRef>;

  highlightedImage = 'assets/imgs/placeholder.jpg';
  selectedImage: any;

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

  optionsResposta9: any = [];
  optionsResposta10: any = [];
  optionsResposta11: any = [];
  optionsResposta14: any = [];

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

  selectedFile: any;
  submitted = false;
  selectedEstado?: string
  selectedCidade?: string;
  selectedUF?: string;
  estados = Estados;
  cidades: any = [];

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private publicService: PublicService,
    private toastr: ToastrService,
    private viacep: NgxViacepService,
  ) {

  }

  onSelectCidade(event: any) {
    this.selectedUF = event.item.sigla;
    this.publicService.getCidadesIBGE(event.item.sigla).subscribe(cidades => {
      this.cidades = cidades;
    });
  }

  getAddressViaCep(): void {
    const CEP = this.regiterClientForm.value.cep;

    this.viacep.buscarPorCep(CEP).pipe(
      catchError((error: CEPError) => {
        return EMPTY;
      })
    ).subscribe((endereco: Endereco) => {
      this.regiterClientForm.controls.rua.setValue(endereco.logradouro);
      this.regiterClientForm.controls.bairro.setValue(endereco.bairro);
    });
  }

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
  changeResposta9(event: any) {
    if(event.target.checked) {
      this.optionsResposta9.push(event.target.value)
    } else {
      let index = this.optionsResposta9.indexOf(event.target.value);
      if (index != -1) {
        this.optionsResposta9.splice(index, 1);
      }
    }
    this.changeRespostas.resposta9 = this.optionsResposta9;
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
   
  changeSelectedFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedFile = event.target.files[0];
      this.submitted = false;
    } else {
      this.selectedFile = null;
    }
  }

  submitRegisterClient() {
    this.submitted = true;
    this.regiterClientForm.controls.genero.patchValue(this.changeRespostas.resposta1);
    this.regiterClientForm.controls.uf.patchValue(this.selectedUF);
    this.regiterClientForm.controls.respostas.patchValue(this.changeRespostas);
    this.regiterClientForm.controls.profissao.patchValue(this.changeRespostas.resposta11);

    const formData = new FormData();
    
    if (this.selectedFile) {
      formData.append('arquivo', this.selectedFile);
    }
  
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
      this.changeRespostas.resposta14 !== '') {
  
      formData.append('formUsersClient', JSON.stringify(this.regiterClientForm.value));
        
      this.publicService.newUserClient(formData).subscribe({
       next: (res) => {
        if(res) {
          setTimeout(() => {
            this.resetInputs();
            this.openDialogConfirmation();
            this.regiterClientForm.reset();
            this.submitted = false;
            this.selectedFile = null;
          }, 500)
        }
       },
       error: (e) => {
          this.submitted = false;
          this.toastr.error('Não é permitido caracteres especiais nos campos de texto. ex: "@!#$[{\/', '', {
            timeOut: 6000
          });
        }
      });
    } else {
      this.toastr.error('Preencha os campos obrigatórios');
    }
  }

  resetInputs() {
    this.changeRespostas.resposta5 = '';
    this.changeRespostas.resposta6 = '';
    this.changeRespostas.resposta7 = '';
    this.changeRespostas.resposta8 = '';
    this.changeRespostas.resposta12 = '';
    this.changeRespostas.resposta13 = '';
    this.check.forEach(item => {
      item.nativeElement.checked = false;
      item.nativeElement.value = '';
    });
  }

  openDialogConfirmation() {
    const initialState = {
      data: {
        modalType: 'CONFIRMATION',
      }
    };
    this.bsModalRef = this.modalService.show(
      ModalComponent,
      Object.assign({ initialState }, { class: 'modal-register-client' }),
    );
  }


}
