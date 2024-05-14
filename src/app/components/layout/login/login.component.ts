import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  usuario!: string;
  senha!: string;

  router = inject(Router);

  logar() {
    if (this.usuario != 'admin') {
      Swal.fire({
        title: 'Usuario não existente!',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } else if (this.senha != 'admin') {
      Swal.fire({
        title: 'Senha equivocada!',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } else {
      this.router.navigate(['admin/autores'])
    }
  }
}
