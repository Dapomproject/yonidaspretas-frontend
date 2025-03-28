import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EsqueciSenhaService } from './services/esqueci-senha.service';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.scss']
})
export class EsqueciSenhaComponent {
  loading = false; // Indica se a requisição está em andamento
  submitted = false; // Indica se o formulário foi submetido
  msgErro = ''; // Armazena mensagens de erro
  sendMailRecovery = false; // Indica se o e-mail de recuperação foi enviado com sucesso

  show = false; // Controla a visibilidade da senha
  type = 'password'; // Define o tipo do campo de senha

  // Declaração do formulário com validação
  recoverForm: FormGroup<any> = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private fb: FormBuilder, // Serviço para construção de formulários reativos
    private esqueciSenhaService: EsqueciSenhaService // Serviço responsável pela lógica de recuperação de senha
    ) { }

  ngOnInit(): void {
  }

  //Alterna a visibilidade da senha
  showHidPassword(): void {
    this.show = !this.show;
    if (this.show) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  //Submete o formulário de recuperação de senha
  submitRecover(): void {
    this.loading = true;
    this.submitted = true;

    if (this.recoverForm.valid) {
      this.esqueciSenhaService.forgotPassword(this.recoverForm.value).subscribe(() => {
        this.loading = false;
        this.submitted = false;
        this.sendMailRecovery = true; // Indica que o e-mail foi enviado com sucesso
      },
      (err: any) => {
        this.msgErro = err.message; // Captura a mensagem de erro
        this.loading = false;
        this.submitted = false;
        this.sendMailRecovery = false;
      });
    } else {
      this.loading = false; // Desativa o carregamento caso o formulário seja inválido
    }
  }
}
