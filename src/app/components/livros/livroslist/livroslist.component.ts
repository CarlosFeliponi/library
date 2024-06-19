import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Livro } from '../../../models/livro';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { LivrosdetailsComponent } from '../livrosdetails/livrosdetails.component';
import { findIndex } from 'rxjs';

@Component({
  selector: 'app-livroslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, LivrosdetailsComponent],
  templateUrl: './livroslist.component.html',
  styleUrl: './livroslist.component.scss'
})
export class LivroslistComponent {
  lista: Livro[] = [];
  livroEdit: Livro = new Livro(0,"");

  modalService = inject(MdbModalService);
  @ViewChild("modalLivroDetails") modalLivroDetails!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

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

  new() {
    this.livroEdit = new Livro(0,'');
    this.modalRef = this.modalService.open(this.modalLivroDetails);

  }

  edit(livro: Livro) {
    this.livroEdit = Object.assign({}, livro);
    this.modalRef = this.modalService.open(this.modalLivroDetails);
  }

  retornoDetails(livro: Livro) {
    if (livro.id_livro <= 0) {
      this.lista.push(livro)
      livro.id_livro = this.lista.length;   
    } else {
      let indice = this.lista.findIndex( x => { return x.id_livro == livro.id_livro })
      this.lista[indice] = livro
    }
    this.modalRef.close();
  }
}
