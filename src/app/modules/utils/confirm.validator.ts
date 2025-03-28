import { FormGroup } from '@angular/forms';

// Função que valida se dois campos de formulário são iguais (por exemplo, senha e confirmação de senha)
export function ConfirmedValidator(controlName: string, matchingControlName: string): any{
     // A função retorna um validador que é aplicado ao FormGroup para verificar se os valores dos controles são iguais
    return (formGroup: FormGroup) => {
         // Obtém o controle de formulário com o nome fornecido
        const control = formGroup.controls[controlName];
        // Obtém o controle de formulário para comparação (por exemplo, confirmar senha)
        const matchingControl = formGroup.controls[matchingControlName];
        // Se o controle de comparação já tem um erro que não é o erro de confirmação (isso impede que o erro seja redefinido)
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
          // Se os valores dos dois campos não são iguais, define um erro de validação no controle de comparação
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        }else {
            // Caso contrário, remove qualquer erro de validação existente
            matchingControl.setErrors(null);
        }
    };
}