import { Component } from '@angular/core';
import {ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import {HttpClient, HttpClientModule} from "@angular/common/http";
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private fb: FormBuilder, private http: HttpClient) {
  }
  registerForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    apellidos: ['',[ Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    mail: ['', [Validators.required, Validators.email, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
    contraseña: ['', [Validators.required,Validators.maxLength(16),Validators.minLength(8)]]
  })
  submit(){
    if(this.registerForm.valid) {
      const formData = this.registerForm.value;
    this.http.post('data/users.json', JSON.stringify(formData)).subscribe({
        next: (response) => console.log('Respuesta del servidor:', response),
        error: (error) => console.error('Error al enviar datos al servidor', error),
      })
    }
  }
}
