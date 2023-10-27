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
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    permission: ['']
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
  
    cadastro(): void {
      this.loading = true;
  
      this.registerForm.get('permission')?.patchValue('admin');
  
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
