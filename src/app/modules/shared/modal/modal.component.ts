import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PublicService } from '../../public/services/public.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit{
  @Input() data?: any = [];
  highlightedImage = 'assets/imgs/placeholder.jpg';
  selectedImage: any

  dadosFormulario: any = [];

  servicosCliente: any = {
    imagem: '',
    titulo: '',
    valor: '',
    descricao: ''
  }
 
  constructor(
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private publicService: PublicService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.getRespostasFormulario();
    this.getDadosServico();
  }

  closeModal(): void {
    this.modalService.hide();
  }

  getRespostasFormulario() {
    this.dadosFormulario.push(this.data?.dadosResposta?.data);
  }

  getDadosServico() {
    if (this.data.dadosServico != undefined) {
      this.servicosCliente = this.data.dadosServico[this.data.indiceServico];
      this.highlightedImage = this.data.dadosServico[this.data.indiceServico]?.imagem;
    }
  }

  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
  
          // Defina a largura e altura desejada para a imagem redimensionada
          const maxWidth = 800;  // Ajuste conforme necessário
          const maxHeight = 800;  // Ajuste conforme necessário
  
          let width = img.width;
          let height = img.height;
  
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round(height * (maxWidth / width));
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round(width * (maxHeight / height));
              height = maxHeight;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          
          this.highlightedImage = canvas.toDataURL('image/jpeg', 0.6);  // 0.7 é a qualidade da imagem (70%)
        };
      };
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.highlightedImage = 'assets/imgs/placeholder.jpg';
      this.selectedImage = null;
    }
  }

  addService() {
    if (this.selectedImage.size <= 1000000) {
      this.servicosCliente.imagem = this.highlightedImage;
    
      this.publicService.subjectServicos.next(this.servicosCliente);
      this.closeModal();
      this.toastr.success('Serviço adicionado com sucesso!', '');
    } else {
      alert('ATENÇÃO: Selecione uma imagem com tamanho menor ou igual a 1MB');
    }
  }

  editService() {
    if(this.selectedImage){
      if (this.selectedImage.size <= 1000000) {
        this.servicosCliente.imagem = this.highlightedImage;
        this.publicService.subjectServicos.next(this.servicosCliente);
        this.closeModal();
        this.toastr.success('Serviço atualizado com sucesso!', '');
      } else {
        alert('ATENÇÃO: Selecione uma imagem com tamanho menor ou igual a 1MB');
      }
    } else {
        this.publicService.subjectServicos.next(this.servicosCliente);
        this.closeModal();
        this.toastr.success('Serviço atualizado com sucesso!', '');
    }
    
  
  }

  delete() {
    this.publicService.deleteUsersClientById(this.data.dados.data.ID).subscribe(() => {
      this.toastr.success('Usuário removido com sucesso!', '');
      this.closeModal();
      this.deleteUserLogin()
    }, (err) => {
      if(err) {
        this.toastr.error('Ocorreu um erro ao remover o usuário.', '');
      }
    });
  }

  deleteUserLogin() {
    this.publicService.deleteUsersClientLoginByUsuarioID(this.data.dados.data.ID).subscribe(() => {
    }, (err) => {
      if(err) {
        this.toastr.error('Ocorreu um erro ao remover o usuário.', '');
      }
    });
  }

  


}
