import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserJsonService} from "../services/user-json.service";
import {FirebaseAuthService} from "../services/firebase-auth.service";
import {Router, RouterLink} from "@angular/router";
import {User} from "../model/user";

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
  user: User = { name: "", email: "", apellidos: "", password: ""};
  loginMsg: string = '';
  constructor(private router: Router,
              private fb: FormBuilder,
              private databaseJSONService: UserJsonService,
              private authService: FirebaseAuthService) { }

  loginForm = this.fb.nonNullable.group({
    loginMail: ['', [Validators.required]],
    loginPwd: ['',[ Validators.required,]]
  });

  submitJSON() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.loginMail;
      const password = this.loginForm.value.loginPwd;

      this.user.email = <string> email
      this.user.password = <string> password
      this.user.name = ""
      this.user.apellidos = ""

      // Obtener los usuarios del JSON
      this.databaseJSONService.getLoggedUser(this.user).subscribe(userIsLogged => {
        if (userIsLogged) {
          console.log('Usuario autenticado');
        } else {
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
          this.router.navigate(['/home'])
        },
        error: (error) => {
          this.loginMsg = error.code;
        }
      });
  }
}
