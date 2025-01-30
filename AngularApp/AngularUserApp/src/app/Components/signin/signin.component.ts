import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../Services/auth.service';
import { User } from '../../Models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  private serviceAccess = inject(AuthService);
  public fromBuild = inject(FormBuilder);

  constructor(private router:Router){}
  
  public signinForm: FormGroup = this.fromBuild.group({
    username:['', Validators.required],
    email:['', Validators.required],
    passwordHash:['', Validators.required]
  })

  signin(){
    if(this.signinForm.invalid)
      return;

    const user: User = {
      id: 0,
      username:  this.signinForm.value.username,
      email:  this.signinForm.value.email,
      passwordHash:  this.signinForm.value.passwordHash

    }

    this.serviceAccess.signin(user).subscribe({
      next:(data) =>{
        if(data.isSuccess){
          this.router.navigate(['login']);
        }
        else{
          alert("No fue posible registrarse");
        }
      },
      error:(err) => {
        console.log(err.message);
      }
    })
  }

  login(){
    this.router.navigate(['login']);
  }


}




