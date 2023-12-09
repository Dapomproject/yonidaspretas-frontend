import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EsqueciSenhaService } from './services/esqueci-senha.service';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.scss']
})
export class EsqueciSenhaComponent {
  loading = false;
  submitted = false;
  msgErro = '';
  sendMailRecovery = false;

  show = false;
  type = 'password';

  recoverForm: FormGroup<any> = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private fb: FormBuilder,
    private esqueciSenhaService: EsqueciSenhaService
    ) { }

  ngOnInit(): void {
  }

  showHidPassword(): void {
    this.show = !this.show;
    if (this.show) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  submitRecover(): void {
    this.loading = true;
    this.submitted = true;

    if (this.recoverForm.valid) {
      this.esqueciSenhaService.forgotPassword(this.recoverForm.value).subscribe(() => {
        this.loading = false;
        this.submitted = false;
        this.sendMailRecovery = true;
      },
      (err: any) => {
        this.msgErro = err.message;
        this.loading = false;
        this.submitted = false;
        this.sendMailRecovery = false;
      });
    } else {
      this.loading = false;
    }
  }
}
