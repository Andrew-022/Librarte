import { Component } from '@angular/core';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {validateWorkspace} from "@angular/cli/src/utilities/config";
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  resultado: string = "";
  constructor(private fb: FormBuilder) {
  }
  registerform = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    apellidos: ['',[ Validators.required]],
    mail: ['', [Validators.required, Validators.email]],
    contraseña: ['', [Validators.required,Validators.maxLength(16),Validators.minLength(8)]]
  })
  submit(){
    if (this.registerform.valid)
      this.resultado = "Registro con exito"
    else
      this.resultado = "Hay datos inválidos"
  }
}
