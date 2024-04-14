import { Component } from '@angular/core';
import {ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {UserJsonService} from "../services/user-json.service";
import {User} from "../model/user";
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  user: User = { name: "", email: "", apellidos: "", password: ""};

  constructor(private fb: FormBuilder, private http: HttpClient, private userJsonService: UserJsonService) {
  }
  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    last_name: ['',[ Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
    password: ['', [Validators.required,Validators.maxLength(16),Validators.minLength(8)]]
  })
  submit(){
    if(this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.user.name = <string>formData.name;
      this.user.apellidos = <string>formData.last_name;
      this.user.email = <string>formData.email;
      this.user.password = <string>formData.password;

      this.userJsonService.postUser(this.user).subscribe(
        (userIsRegistered) => {
          if(userIsRegistered) {
            console.log("User created.")
          } else {
            console.log("This email already exists.")
          }
        }
      )
    }

  }
}
