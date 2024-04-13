import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserJsonService} from "../services/user-json.service";

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

  loginMsg: string = '';
  constructor(private fb: FormBuilder, private databaseJSONService: UserJsonService) {
  }
  loginForm = this.fb.group({
    loginMail: ['', [Validators.required]],
    loginPwd: ['',[ Validators.required,]]
  });

  submit() {
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
}
