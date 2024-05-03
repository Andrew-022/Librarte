import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {UserJsonService} from "../services/user-json.service";
import {FirebaseAuthService} from "../services/firebase-auth.service";
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  //user: User = { name: "", email: "", apellidos: "", password: ""};
  message: string |null = null;
  constructor(private fb: FormBuilder, private databaseJSONService: UserJsonService, private authService: FirebaseAuthService) {
  }
  registerForm = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    apellidos: ['',[ Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    mail: ['', [Validators.required, Validators.email, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
    contraseña: ['', [Validators.required,Validators.maxLength(16),Validators.minLength(8)]]
  })
    submit(){
      const rawForm = this.registerForm.getRawValue();
      this.authService.register(rawForm.mail, rawForm.nombre, rawForm.contraseña)
        .subscribe({
          next: () =>{
            this.message = "Usuario Registrado"
          },
          error: (error) => {
            this.message = error.code;
          }
        });
    }

  // submitJSON(){
  //   if(this.registerForm.valid) {
  //     const formData = this.registerForm.value;
  //     this.user.email = <string>formData.mail;
  //     this.user.name = <string>formData.nombre;
  //     this.user.apellidos = <string>formData.apellidos;
  //     this.user.password = <string>formData.contraseña;
  //
  //     this.databaseJSONService.postBooks("http://localhost:3000/data/users", this.user)
  //   this.http.post('data/users.json', JSON.stringify(formData)).subscribe({
  //        next: (response) => console.log('Respuesta del servidor:', response),
  //        error: (error) => console.error('Error al enviar datos al servidor', error),
  //      })
  //   }
  // }
}


