import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login/services/login.service';
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-pt-br'
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core'
import { environment } from 'src/environments/environment';
import { ConfirmedValidator } from '../utils/confirm.validator';
import { ActivatedRoute } from '@angular/router';
import { PublicService } from '../public/services/public.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  show = false;  // Controla a visibilidade da senha
  type = 'password'; // Define o tipo de campo da senha como "password"

  showLoginForm = true; // Controla a visibilidade do formulário de login
  loading = false; // Controla o estado de carregamento durante a submissão
  msgErro = ''; // Mensagem de erro para exibição

  // Configurações do zxcvbn para análise de senha
  options = {
    translations: zxcvbnEnPackage.translations, // Traduções para o zxcvbn
    dictionary: {
      ...zxcvbnEnPackage.dictionary, // Dicionário do zxcvbn
    },
  }

  siteKey = environment.KEY_RECAPTCHA; // Obtém a chave do reCAPTCHA do arquivo de ambiente
  submitted = false; // Indica se o formulário foi enviado
  userID: any; // Armazena o ID do usuário
  newPass = false; // Indica se o usuário está configurando uma nova senha

   // Formulário para o registro de usuário com validações
  registerForm: UntypedFormGroup = this.fb.group({
    ID: [],
    usuarioID: [],
    nomeCompleto: [],
    email: [''],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    confirmarSenha: ['', [Validators.required, Validators.minLength(6)]],
    recaptcha: [''],
    tipoUsuario: ['']
  },{ validator: ConfirmedValidator('senha', 'confirmarSenha') });  // Validador customizado para confirmar a senha

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private publicService: PublicService,
    private route: ActivatedRoute,
    private toastr: ToastrService
    ) {}

    ngOnInit(): void {
      // Chama o método para obter os dados do cliente
      this.getUserClient();

       // Configura o zxcvbn com as opções definidas para análise de senha
      zxcvbnOptions.setOptions(this.options);
      zxcvbn(this.registerForm.value.senha); // Chama a função zxcvbn para validar a senha fornecida
    }

      // Método para alternar a visibilidade da senha
    showHidPassword(): void {
      this.show = !this.show;
      if (this.show) {
        this.type = 'text'; // Se estiver visível, muda o tipo para 'text'
      } else {
        this.type = 'password'; // Se não estiver visível, volta para 'password'
      }
    }

    // Método para obter os dados do cliente a partir da URL
    getUserClient() {
      this.userID = parseInt(this.route.snapshot.queryParams.userId); // Obtém o ID do usuário da URL
      this.newPass = this.route.snapshot.queryParams.newpass; // Verifica se é uma nova senha a ser configurada
      
      // Chama o serviço público para obter os dados do usuário
      this.publicService.getUsersClientById(this.userID).subscribe(user => {
        if (user[0]){
            // Preenche os campos do formulário com os dados do usuário
          this.registerForm.get('usuarioID')?.patchValue(this.userID);
          this.registerForm.get('email')?.patchValue(user[0].email);
          this.registerForm.get('tipoUsuario')?.patchValue(environment.USER_TYPE.CLIENTE);
        }
   
      });
    }
  
    // Método para registrar um novo usuário
    submitNewUser(): void {
      this.loading = true; // Ativa o carregamento
      this.submitted = true; // Marca o formulário como submetido

      // Verifica se o formulário é válido
      if (this.registerForm.valid) {
        this.msgErro = ''; // Limpa a mensagem de erro
        this.loginService.register(this.registerForm.value).subscribe((res) => {
          if (res) { 
            this.loading = false; // Desativa o carregamento
            this.submitted = false;  // Desmarca o envio
            this.registerForm.reset();  // Reseta o formulário
            this.toastr.success('Senha cadastrada com sucesso! Faça login em sua conta', '');  // Exibe uma mensagem de sucesso
          }
         },
         (err: any) => {
           this.loading = false;  // Desativa o carregamento em caso de erro
           this.submitted = false;   // Desmarca o envio
           this.loginRegisterError(err.message); // Exibe a mensagem de erro
         });
      } else {
        this.loading = false;  // Desativa o carregamento se o formulário não for válido
      }
    }

    // Método para atualizar a senha do usuário
    atualizarSenhaUsuario() {
     
      this.loading = true;
      this.submitted = true;
  
      // Verifica se o campo de senha é válido
      if (this.registerForm.controls.senha.valid) {
        // Chama o serviço para atualizar a senha
        this.loginService.atualizarSenhaUsuario(this.userID, this.registerForm.value).subscribe(() => {
          this.loading = false;
          this.submitted = false;
          this.toastr.success('Senha atualizada com sucesso! Faça login em sua conta', '');
        },
        (err) => {
          this.msgErro = err.message; // Armazena a mensagem de erro
          this.loading = false;
          this.submitted = false;
        });
      } else {
        this.loading = false;
      }
    }
  
     // Método para lidar com erros durante o registro ou atualização da senha
    private loginRegisterError(err: any): void {
      this.msgErro = err; // Armazena a mensagem de erro
    }
}
