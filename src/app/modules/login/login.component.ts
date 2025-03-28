import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  show = false; // Controla a visibilidade da senha
  type = 'password'; // Tipo do campo de senha, inicialmente 'password'

  showLoginForm = true; // Controla se o formulário de login ou de registro será exibido
  loading = false; // Indica se a requisição está em andamento
  msgErro = ''; // Armazena mensagens de erro

   // Declaração do formulário de login com validação
  loginForm: UntypedFormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]], // Campo e-mail, obrigatório e com validação de formato
    senha: ['', [Validators.required, Validators.minLength(6)]] // Campo senha, obrigatório e com validação de mínimo de 6 caracteres
  });

  // Declaração do formulário de registro com validação
  registerForm: UntypedFormGroup = this.fb.group({
    id: [''],
    usuarioID: [''],
    nomeCompleto: [''],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    tipoUsuario: ['']
  });

  constructor(
    private fb: FormBuilder, // Serviço para construir formulários reativos
    private loginService: LoginService // Serviço responsável pela autenticação e registro de usuários
    ) { }

    //Alterna a visibilidade da senha entre 'password' e 'text'
    showHidPassword(): void {
      this.show = !this.show;
      if (this.show) {
        this.type = 'text';
      } else {
        this.type = 'password';
      }
    }
  
    //Submete o formulário de registro de usuário admin
    /*submitAdmin(): void {
      this.loading = true;
      this.registerForm.get('usuarioID')?.patchValue(0);
      this.registerForm.get('nomeCompleto')?.patchValue('Administrador')
      this.registerForm.get('email')?.patchValue('admin@yonidaspretas.com.br')
      this.registerForm.get('senha')?.patchValue('admin@2023')
      this.registerForm.get('tipoUsuario')?.patchValue('adm');
  
      if (this.registerForm.valid) {
        this.msgErro = '';
        this.loginService.register(this.registerForm.value).subscribe((res) => {
          if (res) { this.loading = false; }
         },
         (err: any) => {
           this.loading = false;
           this.loginRegisterError(err.message);
         });
      } else {
        this.loading = false;
      }
    }*/
  
    //Submete o formulário de login
    submitLogin(): void {
      this.loading = true; // Ativa o indicador de carregamento
      if (this.loginForm.valid) {
        // Chama o serviço de login com os dados do formulário
        this.loginService.login(this.loginForm.value).subscribe(() => {
          this.loading = false;
        },
          (err) => {
            this.loading = false;
            this.loginRegisterError(err.message); // Exibe a mensagem de erro caso falhe
          });
      } else {
        this.loading = false; // Desativa o carregamento caso o formulário seja inválido
      }
    }
  
    //Exibe a mensagem de erro
    private loginRegisterError(err: any): void {
      this.msgErro = err; // Atualiza a mensagem de erro no componente
    }
}
