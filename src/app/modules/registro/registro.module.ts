import { NgModule, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { DEFAULT_PSM_OPTIONS } from 'angular-password-strength-meter/zxcvbn';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [
    RegistroComponent,
   
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordStrengthMeterModule,
    NgxCaptchaModule
  ],
  providers: [
    importProvidersFrom(
      PasswordStrengthMeterModule.forRoot(DEFAULT_PSM_OPTIONS)
    )
  ]
})

export class RegistroModule { }
