import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Livro } from '../../../models/livro';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-livroslist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './livroslist.component.html',
  styleUrl: './livroslist.component.scss'
})
export class LivroslistComponent {
  lista: Livro[] = [];

  constructor() {
    this.lista.push(new Livro(1, 'O senhor do anéis'));
    this.lista.push(new Livro(2, 'As crônicas de gelo e fogo'));
    this.lista.push(new Livro(3, 'Rápido e devagar: Duas formas de pensar'));
    this.lista.push(new Livro(4, 'O Hobbit'));
    this.lista.push(new Livro(5, 'O poder do hábito'));

    let livroNovo = history.state.livroNovo;
    let livroEditado = history.state.livroEditado;

    if (livroNovo) {
      livroNovo.id_livro = this.lista.length + 1;
      this.lista.push(livroNovo);
    }

    if (livroEditado) {
      let indice = this.lista.findIndex(x => { return x.id_livro == livroEditado.id_livro });
      this.lista[indice] = livroEditado;
    }
  }

  deleteById(id_livro: number) {
    Swal.fire({
      title: 'Tem certeza?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim!",
      cancelButtonText: "Não!",
    }).then((result) => {
      if (result.isConfirmed) {
        let indice = this.lista.findIndex(x => { return x.id_livro == id_livro })
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
