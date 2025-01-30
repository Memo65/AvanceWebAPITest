import { Component, inject } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../Services/user.service';
import { User } from '../../Models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  private userService = inject(UserService);
  public userList: User[] = [];
  public displayedColumns: string[] = ['Id', 'Username', 'Email', 'Actions']

  constructor(private router:Router){
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe({
      next:(data) => {
        if(data.length > 0){
          this.userList = data;
        }
      },
      error:(err) => {
        console.log(err.message)
      }
    })
  }

  createUser(){
    this.router.navigate(['/user', 0])
  }

  updateUser(user: User){
    this.router.navigate(['/user', user.id])
  }

  deleteUser(user: User){
    if(confirm("Desea eliminar el usuario " + user.username + "?")){
      this.userService.deleteUser(user.id).subscribe({
        next:(data) => {
          if(data.isSuccess){
            this.getUsers()
          }
          else{
            alert("No se ha podido eliminar el usuario")
          }
        },
        error:(err) => {
          console.log(err)
        }
      })
    }
  }

}
