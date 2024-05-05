import {Component, OnInit} from '@angular/core';
import {FirebaseAuthService} from "../services/firebase-auth.service";
import {User} from "../model/user";
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  constructor(private fb: FormBuilder, private authService: FirebaseAuthService) { }

  user?: any = {'name': '', 'apellidos': '', 'email': '', 'password': '', 'profilePicture': 'https://png.pngtree.com/background/20230525/original/pngtree-an-egg-with-a-sad-face-sitting-on-a-dark-background-picture-image_2726098.jpg'};
  private profilePicture?: File;

  personalDataForm = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    apellidos: ['',[ Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
  });

  passwordDataForm = this.fb.nonNullable.group({
    password: ['', [Validators.required,Validators.maxLength(16),Validators.minLength(8)]],
    oldPassword: ['', [Validators.required,Validators.maxLength(16),Validators.minLength(8)]],
  });

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.authService.user$.subscribe(
      (user) => {
        if(user) {
          this.user.email = user.email;
          try {
            this.authService.getUserData()
              .then(
                (data: any) => {
                  this.user.nombre = data.username;
                  this.user.apellidos = data.last_name;
                  console.log("PRofile pic = ", data.profilePictureURL)
                  this.user.profilePicture = data.profilePictureURL;
                }
              )
          } catch (error) {
            console.error("Ha habido un error al obtener los datos del usuario:", error);
          }
        } else {
          console.log("No hay un usuario autenticado.");
        }
      }
    );
  }
  submitChangeOfPassword() {
    const rawPasswordDataForm = this.passwordDataForm.getRawValue();

    this.authService.updateUserPassword(rawPasswordDataForm.oldPassword, rawPasswordDataForm.password)
    .then((result: boolean) => {
        if(result) {
          console.log("La contraseña se ha actualizado correctamente.")
        } else {
          console.error("La contraseña no se ha podido actualizar, inténtelo de nuevo.")
        }
      }
    )
    .catch((error) => {
      console.error("Ha ocurrido un problema al actualizar la contraseña ", error)
    });
    this.getUserData();
  }

  submitUserData() {
    const rawPersonalDataForm = this.personalDataForm.getRawValue();

    let username = rawPersonalDataForm.nombre != '' ? rawPersonalDataForm.nombre : this.user.nombre;
    let lastname = rawPersonalDataForm.apellidos != '' ? rawPersonalDataForm.apellidos : this.user.apellidos;
    let userEmail = rawPersonalDataForm.email != '' ? rawPersonalDataForm.email : this.user.email;
    let password = ''
    let profilePictureURL = this.user.profilePicture != '' ? this.user.profilePicture: '';

    this.authService.saveUserData(username, lastname, userEmail, password)
    .then((result: boolean) => {
        if(result) {
          console.log("Los datos se han actualizado correctamente.")
        } else {
          console.error("Los datos no se han podido actualizar, inténtelo de nuevo.")
        }
      }
    )
    .catch((error) => {
      console.error("Ha ocurrido un problema al actualizar los datos ", error)
    });

    if(this.profilePicture != null) {
      this.authService.uploadProfilePicture(<File> this.profilePicture).then(
        (response) => {
          if(response) {
            console.log("La imagen se ha cargado.");
          } else {
            console.log("Ha habido un error al cargar la imagen.");
          }
          this.getUserData();
        }
      );
    }

  }

  uploadProfilePicture(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10485760) {
        alert('El archivo debe ser menor a 10 MB.');
        return;
      }
      this.profilePicture = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        if(e.target) {
          this.user.profilePicture = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
