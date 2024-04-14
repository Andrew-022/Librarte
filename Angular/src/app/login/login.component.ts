import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserJsonService} from "../services/user-json.service";
import {User} from "../model/user";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user!: User
  loginMsg: string = '';
  constructor(private fb: FormBuilder, private userJSONService: UserJsonService) {
  }
  loginForm = this.fb.group({
    loginMail: ['', [Validators.required]],
    loginPwd: ['',[ Validators.required,]]
  });

  submit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.loginMail;
      const password = this.loginForm.value.loginPwd;

      this.user.email = email || ""
      this.user.password = password || ""
      this.user.name = ""
      this.user.apellidos = ""
      // Obtener los usuarios del JSON
      this.userJSONService.getLoggedUser(this.user).subscribe(userIsLogged => {
        if (userIsLogged) {
          // Usuario autenticado
          console.log('Usuario autenticado');
        } else {
          // Credenciales incorrectas
          this.loginMsg = 'Credenciales incorrectas'
        }
      });
    }
  }
}
