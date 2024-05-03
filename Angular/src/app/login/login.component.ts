import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserJsonService} from "../services/user-json.service";
import {FirebaseAuthService} from "../services/firebase-auth.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginMsg: string = '';
  constructor(private fb: FormBuilder, private databaseJSONService: UserJsonService, private authService: FirebaseAuthService) {
  }
  loginForm = this.fb.nonNullable.group({
    loginMail: ['', [Validators.required]],
    loginPwd: ['',[ Validators.required,]]
  });

  submitJSON() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.loginMail;
      const password = this.loginForm.value.loginPwd;

      // Obtener los usuarios del JSON
      this.databaseJSONService.getUsers().subscribe(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          // Usuario autenticado
          console.log('Usuario autenticado');
        } else {
          // Credenciales incorrectas
          this.loginMsg = 'Credenciales incorrectas'
        }
      });
    }
  }

  submit(){
    const rawForm = this.loginForm.getRawValue();
    this.authService.login(rawForm.loginMail, rawForm.loginPwd)
      .subscribe({
        next: () =>{
          this.loginMsg = "Usuario Registrado"
        },
        error: (error) => {
          this.loginMsg = error.code;
        }
      });
  }
}
