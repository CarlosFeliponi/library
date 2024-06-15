import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Biblioteca } from '../../../models/biblioteca';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bibliotecalist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './bibliotecalist.component.html',
  styleUrl: './bibliotecalist.component.scss'
})
export class BibliotecalistComponent {
  lista: Biblioteca[] = [];

  constructor() {
    this.lista.push(new Biblioteca(1, 'Biblioteca Nacional de Praga'));
    this.lista.push(new Biblioteca(2, 'Real Gabinete'));
    this.lista.push(new Biblioteca(3, 'Mosteiro de Admont'));
    this.lista.push(new Biblioteca(4, 'Nacional da Áustria'));
    this.lista.push(new Biblioteca(5, 'Trinity College Library'));

    let bibliotecaNovo = history.state.bibliotecaNovo;
    let bibliotecaEditado = history.state.bibliotecaEditado;

    if (bibliotecaNovo) {
      bibliotecaNovo.id_biblioteca = this.lista.length + 1;
      this.lista.push(bibliotecaNovo);
    }

    if (bibliotecaEditado) {
      let indice = this.lista.findIndex(x => { return x.id_biblioteca == bibliotecaEditado.id_biblioteca })
      this.lista[indice] = bibliotecaEditado;

    }
  }

  deleteById(id_biblioteca: number) {
    Swal.fire({
      title: 'Tem certeza?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim!",
      cancelButtonText: "Não!",
    }).then((result) => {
      if (result.isConfirmed) {
        let indice = this.lista.findIndex(x => { return x.id_biblioteca == id_biblioteca })
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
