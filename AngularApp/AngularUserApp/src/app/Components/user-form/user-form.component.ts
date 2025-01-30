import { Component, inject, Input, OnInit, signal } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormControl, Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { User } from '../../Models/User';
import { merge } from 'rxjs';

@Component({
  selector: 'app-user-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  @Input('id') userId!: number;
  private userService = inject(UserService);
  public formBuild = inject(FormBuilder);

  public userForm: FormGroup = this.formBuild.group({
    username: [''],
    passwordHash: [''],
    email: ['']
  })

  readonly email = new FormControl('', [Validators.required, Validators.email]);
  errorMessage = signal('')

  constructor(private router: Router){
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('Debes ingresar un correo');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Correo invalido');
    } else {
      this.errorMessage.set('');
    }
  }

  ngOnInit(): void {
    if(this.userId != 0){
      this.userService.getUserById(this.userId).subscribe({
        next: (data) =>  {
          this.userForm.patchValue({
            username: data.username,
            passwordHash: [''],
            email: data.email
          })
        },
        error: (err) =>{
          console.log(err.message)
        }
      })
    }
  }

  saveUser(){
    const user: User = {
      id: this.userId,
      username: this.userForm.value.username,
      passwordHash: this.userForm.value.passwordHash,
      email: this.userForm.value.email,
    }
    console.log(user)
    if(this.userId == 0){
      this.userService.createUser(user).subscribe({
        next: (data) =>  {
          if(data.isSuccess){
            this.router.navigate(["/"]);
          }
          else {
            alert("Error al intentar crear el usuario")
          }
        },
        error: (err) =>{
          console.log(err.message)
        }
      })
    }
    else {
      this.userService.updateUser(user).subscribe({
        next: (data) =>  {
          if(data.isSuccess){
            this.router.navigate(["/"]);
          }
          else {
            alert("Error al intentar modificar el usuario")
          }
        },
        error: (err) =>{
          console.log(err.message)
        }
      })
    }

  }

  home(){
    this.router.navigate(["/home"]);
  }

}
