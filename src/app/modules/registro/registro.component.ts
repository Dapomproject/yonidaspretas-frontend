import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login/services/login.service';
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-pt-br'
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core'
import { environment } from 'src/environments/environment';
import { ConfirmedValidator } from '../utils/confirm.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService } from '../public/services/public.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  show = false;
  type = 'password';

  showLoginForm = true;
  loading = false;
  msgErro = '';

  options = {
    translations: zxcvbnEnPackage.translations,
    dictionary: {
      ...zxcvbnEnPackage.dictionary,
    },
  }

  siteKey = environment.KEY_RECAPTCHA;
  submitted = false;
  userID: any;
  newPass = false;

  registerForm: UntypedFormGroup = this.fb.group({
    ID: [],
    usuarioID: [],
    nomeCompleto: [],
    email: [''],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    confirmarSenha: ['', [Validators.required, Validators.minLength(6)]],
    recaptcha: [''],
    tipoUsuario: ['']
  },{ validator: ConfirmedValidator('senha', 'confirmarSenha') });

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private publicService: PublicService,
    private route: ActivatedRoute,
    private toastr: ToastrService
    ) {}

    ngOnInit(): void {
      this.getUserClient();

      //indicador de nível de senha
      zxcvbnOptions.setOptions(this.options);
      zxcvbn(this.registerForm.value.senha);
    }

    showHidPassword(): void {
      this.show = !this.show;
      if (this.show) {
        this.type = 'text';
      } else {
        this.type = 'password';
      }
    }

    getUserClient() {
      this.userID = parseInt(this.route.snapshot.queryParams.userId);
      this.newPass = this.route.snapshot.queryParams.newpass;
      
      this.publicService.getUsersClientById(this.userID).subscribe(user => {
        if (user[0]){
          this.registerForm.get('usuarioID')?.patchValue(this.userID);
          this.registerForm.get('email')?.patchValue(user[0].email);
          this.registerForm.get('tipoUsuario')?.patchValue(environment.USER_TYPE.CLIENTE);
        }
   
      });
    }
  
    submitNewUser(): void {
      this.loading = true;
      this.submitted = true;

      if (this.registerForm.valid) {
        this.msgErro = '';
        this.loginService.register(this.registerForm.value).subscribe((res) => {
          if (res) { 
            this.loading = false;
            this.submitted = false; 
            this.registerForm.reset();
            this.toastr.success('Senha cadastrada com sucesso! Faça login em sua conta', '');
          }
         },
         (err: any) => {
           this.loading = false;
           this.submitted = false; 
           this.loginRegisterError(err.message);
         });
      } else {
        this.loading = false;
      }
    }

    atualizarSenhaUsuario() {
     
      this.loading = true;
      this.submitted = true;
  
      if (this.registerForm.controls.senha.valid) {
        this.loginService.atualizarSenhaUsuario(this.userID, this.registerForm.value).subscribe(() => {
          this.loading = false;
          this.submitted = false;
          this.toastr.success('Senha atualizada com sucesso! Faça login em sua conta', '');
        },
        (err) => {
          this.msgErro = err.message;
          this.loading = false;
          this.submitted = false;
        });
      } else {
        this.loading = false;
      }
    }
  
    private loginRegisterError(err: any): void {
      this.msgErro = err;
    }
}
