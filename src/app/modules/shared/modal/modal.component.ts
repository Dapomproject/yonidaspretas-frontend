import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PublicService } from '../../public/services/public.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit{
  @Input() data?: any = [];
  highlightedImage = 'assets/imgs/placeholder.jpg';
  selectedImage: any;

  changeRespostas = {
    res1: '',
    res2: '',
    res3: '',
    res4: '',
  }

  selectedFile: any;

  regiterClientForm: UntypedFormGroup = this.fb.group({
    ID: [],
    nomeCompleto: [''],
    nomeSocial: [''],
    avatar: [''],
    email: ['', [Validators.required, Validators.email]],
    profissao: [''],
    celular: [''],
    breveDescricao: [''],
    descricaoCompleta: [''],
    produtosServicos: [''],
    formatoAtendimento: [''],
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
    status: [],
  });

  dadosRespostas: any = [];

  servicosCliente = {
    imagem: '',
    titulo: '',
    valor: '',
    descricao: ''
  }
 

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private publicService: PublicService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getRespostasFormulario();
  }

  closeModal(): void {
    this.modalService.hide();
  }

  changeRes1(event: any){
    this.changeRespostas.res1 = event.target.value;
  }
  changeRes2(event: any){
    this.changeRespostas.res2 = event.target.value;
  }
  changeRes3(event: any){
    this.changeRespostas.res3 = event.target.value;
  }
  changeRes4(event: any){
    this.changeRespostas.res4 = event.target.value;
  }

  changeSelectedFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedFile = event.target.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  submitRegisterClient() {
    this.regiterClientForm.controls.respostas.patchValue(this.changeRespostas);
    const formData = new FormData();
    
    if (this.selectedFile) {
      formData.append('arquivo', this.selectedFile);
    }

    formData.append('formUsersClient', JSON.stringify(this.regiterClientForm.value));
    
    this.publicService.newUserClient(formData).subscribe(res => {
      if(res) {
        this.closeModal();
        setTimeout(() => {
          this.openDialogConfirmation();
        }, 500)
      
      }
    })
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

  getRespostasFormulario() {
    this.dadosRespostas.push(this.data?.dadosResposta?.data?.respostas);
  }

  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.highlightedImage = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.highlightedImage = 'assets/imgs/placeholder.jpg';
      this.selectedImage = null;
    }
  }

  addService() {
    this.servicosCliente.imagem = this.highlightedImage;
    this.publicService.subjectServicos.next(this.servicosCliente);
    this.closeModal();
    this.toastr.success('Serviço adicionado com sucesso!', '');
  }


}
