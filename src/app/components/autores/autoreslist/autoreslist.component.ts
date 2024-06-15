import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Autor } from '../../../models/autor';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-autoreslist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './autoreslist.component.html',
  styleUrl: './autoreslist.component.scss'
})
export class AutoreslistComponent {
  lista: Autor[] = [];

  constructor() {
    this.lista.push(new Autor(1, 'J. R. R. Tolkien'));
    this.lista.push(new Autor(2, 'George R. R. Martin'));
    this.lista.push(new Autor(3, 'J. K. Rowling'));
    this.lista.push(new Autor(4, 'Blake Crouch'));
    this.lista.push(new Autor(5, 'William Shakespeare'));

    let autorNovo = history.state.autorNovo;
    let autorEditado = history.state.autorEditado;

    if (autorNovo) {
      autorNovo.id_autor = this.lista.length + 1;
      this.lista.push(autorNovo);
    }

    if (autorEditado) {
      let indice = this.lista.findIndex( x => { return x.id_autor == autorEditado.id_autor })
      this.lista[indice] = autorEditado;
    }
  }

  deleteById(id_autor: number) {
    Swal.fire({
      title: 'Tem certeza?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim!",
      cancelButtonText: "Não!",
    }).then((result) => {
      if (result.isConfirmed) {
        let indice = this.lista.findIndex(x => { return x.id_autor == id_autor })
        this.lista.splice(indice, 1);

        Swal.fire({
          title: 'Deletado com sucesso!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      }
    });
  }
}
