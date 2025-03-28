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
  @Input() data?: any = []; // Entrada de dados para o modal
  highlightedImage = 'assets/imgs/placeholder.jpg'; // Imagem em destaque (imagem padrão)
  selectedImage: any // Imagem selecionada pelo usuário

  dadosFormulario: any = []; // Dados do formulário

  servicosCliente: any = { // Dados do serviço do cliente
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
    private sanitizer: DomSanitizer  // Sanitizador para URLs e imagens
  ) {}

  ngOnInit() {
    this.getRespostasFormulario(); // Chama a função para obter respostas do formulário
    this.getDadosServico(); // Chama a função para obter os dados do serviço
  }

  // Fecha o modal
  closeModal(): void {
    this.modalService.hide();
  }

   // Função para obter as respostas do formulário a partir dos dados de entrada
  getRespostasFormulario() {
    this.dadosFormulario.push(this.data?.dadosResposta?.data);
  }

   // Função para obter os dados do serviço do cliente
  getDadosServico() {
    if (this.data.dadosServico != undefined) {
      this.servicosCliente = this.data.dadosServico[this.data.indiceServico]; // Atribui os dados do serviço
      this.highlightedImage = this.data.dadosServico[this.data.indiceServico]?.imagem; // Define a imagem em destaque
    }
  }

  // Função para visualizar a prévia da imagem selecionada pelo usuário
  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {  // Verifica se há um arquivo selecionado
      const reader = new FileReader();  // Cria um leitor de arquivos
      reader.onload = (e: any) => {
        const img = new Image();  // Cria um novo objeto de imagem
        img.src = e.target.result; // Define a fonte da imagem
        img.onload = () => {  // Quando a imagem for carregada
          const canvas = document.createElement('canvas'); // Cria um elemento canvas para redimensionar a imagem
          const ctx = canvas.getContext('2d');  // Obtém o contexto de desenho
  
          // Defina a largura e altura desejada para a imagem redimensionada
          const maxWidth = 800;  // Largura máxima
          const maxHeight = 800;  // Altura máxima
  
          let width = img.width;
          let height = img.height;
  
             // Redimensiona a imagem mantendo a proporção
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
  
          canvas.width = width; // Define a largura do canvas
          canvas.height = height;  // Define a altura do canvas
          ctx?.drawImage(img, 0, 0, width, height); // Desenha a imagem redimensionada no canvas
          
          this.highlightedImage = canvas.toDataURL('image/jpeg', 0.6) // Converte a imagem em formato JPEG com qualidade 60%
        };
      };
      reader.readAsDataURL(event.target.files[0]); // Lê o arquivo de imagem selecionado
      this.selectedImage = event.target.files[0]; // Armazena o arquivo selecionado
    } else {
      this.highlightedImage = 'assets/imgs/placeholder.jpg'; // Se não houver imagem, exibe a imagem padrão
      this.selectedImage = null;
    }
  }

  // Função para adicionar um serviço
  addService() {
    if (this.selectedImage.size <= 1000000) {  // Verifica se a imagem tem tamanho <= 1MB
      this.servicosCliente.imagem = this.highlightedImage; // Atribui a imagem destacada ao serviço
    
      this.publicService.subjectServicos.next(this.servicosCliente);  // Emite o serviço atualizado
      this.closeModal();
      this.toastr.success('Serviço adicionado com sucesso!', '');  // Exibe uma notificação de sucesso
    } else {
      alert('ATENÇÃO: Selecione uma imagem com tamanho menor ou igual a 1MB'); // Exibe um alerta caso a imagem seja muito grande
    }
  }

    // Função para editar um serviço
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

   // Função para deletar um usuário
  delete() {
    this.publicService.deleteUsersClientById(this.data.dados.data.ID).subscribe(() => {
      this.toastr.success('Usuário removido com sucesso!', '');
      this.closeModal(); // Fecha o modal
      this.deleteUserLogin(); // Exclui o login do usuário
    }, (err) => {
      if(err) {
        this.toastr.error('Ocorreu um erro ao remover o usuário.', ''); // Exibe uma notificação de erro
      }
    });
  }

   // Função para deletar o login do usuário
  deleteUserLogin() {
    // Chama o serviço para excluir o login do usuário
    this.publicService.deleteUsersClientLoginByUsuarioID(this.data.dados.data.ID).subscribe(() => {
    }, (err) => {
      if(err) {
        this.toastr.error('Ocorreu um erro ao remover o usuário.', '');  // Exibe uma notificação de erro
      }
    });
  }
}
