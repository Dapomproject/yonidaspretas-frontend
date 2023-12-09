import { Component } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  show = false;
  type = 'password';

  showLoginForm = true;
  loading = false;
  msgErro = '';

  loginForm: UntypedFormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]]
  });

  registerForm: UntypedFormGroup = this.fb.group({
    id: [''],
    usuarioID: [''],
    nomeCompleto: [''],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    tipoUsuario: ['']
  });

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
    ) { }

    showHidPassword(): void {
      this.show = !this.show;
      if (this.show) {
        this.type = 'text';
      } else {
        this.type = 'password';
      }
    }
  
    submitNewUser(): void {
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
    }
  
    submitLogin(): void {
      this.loading = true;
      if (this.loginForm.valid) {
        this.loginService.login(this.loginForm.value).subscribe(() => {
          this.loading = false;
        },
          (err) => {
            this.loading = false;
            this.loginRegisterError(err.message);
          });
      } else {
        this.loading = false;
      }
    }
  
    private loginRegisterError(err: any): void {
      this.msgErro = err;
    }
}
