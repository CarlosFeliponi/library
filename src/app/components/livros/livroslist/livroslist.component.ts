import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Livro } from '../../../models/livro';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { LivrosdetailsComponent } from '../livrosdetails/livrosdetails.component';
import { findIndex } from 'rxjs';
import { LivroService } from '../../../services/livro.service';

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

  livroService = inject(LivroService);

  modalService = inject(MdbModalService);
  @ViewChild("modalLivroDetails") modalLivroDetails!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  constructor() {
    this.listAll();    

    let livroNovo = history.state.livroNovo;
    let livroEditado = history.state.livroEditado;

    if (livroNovo) {
      livroNovo.id = this.lista.length + 1;
      this.lista.push(livroNovo);
    }

    if (livroEditado) {
      let indice = this.lista.findIndex(x => { return x.id == livroEditado.id });
      this.lista[indice] = livroEditado;
    }
  }

  deleteById(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim!",
      cancelButtonText: "Não!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.livroService.delete(id).subscribe({
          next: value => {
            Swal.fire({
              title: value,
              icon: 'success',
              confirmButtonText: 'OK'
            })
            this.listAll();
          }, error: erro => {
            Swal.fire({
              title: erro,
              icon: 'error',
              confirmButtonText: 'OK'
            })
          }
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
    this.listAll();
    this.modalRef.close();
  }

  listAll() {
    this.livroService.listAll().subscribe ({
      next: value => {
        this.lista = value;
      }, error: erro => {
        alert("Erro com exemplo de tratamento");
        console.error(erro);
      }
    })
  }
}
