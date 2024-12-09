import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { FormsModule } from '@angular/forms';

import axios from 'axios';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  usuarios: any[] = [];
  administradores: any[] = [];
  userId: number = NaN ; // Aquí puedes setear el ID estático o dinámicamente
  adminName: string | null = null; // Esto puede venir de un servicio
  adminEmail: string | null = null;
  adminRol: string | null = null;
  modal: boolean = false;
  modal2: boolean = false;
  modal3: boolean = false;
  newAdmin: string = ''
  newEmailAdmin: string = ''
  newPassword: string = ''
      
  constructor(private users: UsersService, private auth: AuthService) {
    this.adminName = this.auth.getUser().name;
    this.adminEmail = this.auth.getUser().email;
    this.adminRol = this.auth.getUser().role;
    console.log(this.adminRol)
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadAdmins();
  }
  togleModal3(): void {
    this.modal3 = !this.modal3;
  }
  togleModal2(): void {
    this.modal2 = !this.modal2;
  }

  toggleModal(): void {
    this.modal = !this.modal;
  }
  registerAdmin(): void {
    axios.post('http://localhost:8000/api/auth/register/admin', {
      name: this.newAdmin,
      email: this.newEmailAdmin,
      password: this.newPassword,
      status: 'active',
      role: 'admin',
    }).then(
      (response) => {
        console.log('Admin registered:', response);
        this.loadUsers();
        this.loadAdmins();
      },
      (error) => {
        this.togleModal3();
        alert('Error al registrar el administrador, verifique los datos ingresados')
        console.error('Error registering admin:', error);
      }
    );
  }

  loadUsers(): void {
    this.userId = this.auth.getUser().id;
    this.users.allUsers(this.userId).subscribe(
      (data) => {
        this.usuarios = data;
        //crear un array con todos las updated_at de los usuarios para poder formaterarlos
        this.usuarios.forEach((usuario) => {
          const date = new Date(usuario.created_at);
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mes comienza desde 0
          const year = date.getFullYear();
          const time = date.toTimeString().split(' ')[0]; // Extraer hh:mm:ss
          usuario.created_at = `${day}-${month}-${year} / ${time}`;
        });
        
        console.log('Usuarios:', this.usuarios);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  loadAdmins(): void {
    this.userId = this.auth.getUser().id;
    this.users.alladmins(this.userId).subscribe(
      (data) => {
        this.administradores = data;
        //crear un array con todos las updated_at de los usuarios para poder formaterarlos
        this.administradores.forEach((admin) => {
          const date = new Date(admin.created_at);
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mes comienza desde 0
          const year = date.getFullYear();
          const time = date.toTimeString().split(' ')[0]; // Extraer hh:mm:ss
          admin.created_at = `${day}-${month}-${year} / ${time}`;
        });
        
        console.log('Administradores:', this.administradores);
      },
      (error) => {
        console.error('Error fetching admins:', error);
      }
    );
  }
  deleteUser(id: number): void {
    axios.delete(`http://localhost:8000/api/admin/delete/${id}`).then(//se usa el id del favorito para eliminarlo
            (response) => {
        console.log('Favorite deleted:', response);
        this.loadUsers();
        this.loadAdmins();
      },
      (error) => {
        console.error('Error deleting favorite:', error);
      }
    );
  }

  changeStatus(id: number): void {
    axios.put(`http://localhost:8000/api/admin/status/${id}`).then(//se usa el id del usuario para cambiar su estado
            (response) => {
        console.log('cambiando status:', response);
        this.loadUsers();
        this.loadAdmins();
      },
      (error) => {
        console.error('Error deleting favorite:', error);
      }
    );
  }

}
