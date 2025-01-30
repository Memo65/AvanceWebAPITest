import { Component, inject } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../Models/Login';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private serviceAccess = inject(AuthService);
  public fromBuild = inject(FormBuilder);

  constructor(private router:Router){}

  public loginForm: FormGroup = this.fromBuild.group({
    email:['', Validators.required],
    passwordHash:['', Validators.required]
  })

  login(){
    if(this.loginForm.invalid){
      return;
    }
    
    const loginFormData: Login = {
      email: this.loginForm.value.email,
      passwordHash: this.loginForm.value.passwordHash 
    }

    

    this.serviceAccess.login(loginFormData).subscribe({
      next:(data) => {
        if(data.isSuccess){
          localStorage.setItem("token", data.token);
          this.router.navigate(['home']);
        }
        else {
          alert("Credenciales incorrectas");
        }
      },
      error:(err) => {
        console.log(err.message);
      }
    })
  }

  signin(){
    this.router.navigate(['signin']);
  }


  

}
