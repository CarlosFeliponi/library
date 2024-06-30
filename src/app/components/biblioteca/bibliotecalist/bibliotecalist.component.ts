import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Biblioteca } from '../../../models/biblioteca';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { BibliotecadetailsComponent } from '../bibliotecadetails/bibliotecadetails.component';

@Component({
  selector: 'app-bibliotecalist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, BibliotecadetailsComponent],
  templateUrl: './bibliotecalist.component.html',
  styleUrl: './bibliotecalist.component.scss'
})
export class BibliotecalistComponent {
  lista: Biblioteca[] = [];
  bibliotecaEdit: Biblioteca = new Biblioteca(0, '');

  modalService = inject(MdbModalService);
  @ViewChild("modalBibliotecaDetails") modalBibliotecaDetails!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  constructor() {
    this.lista.push(new Biblioteca(1, 'Biblioteca Nacional de Praga'));
    this.lista.push(new Biblioteca(2, 'Real Gabinete'));
    this.lista.push(new Biblioteca(3, 'Mosteiro de Admont'));
    this.lista.push(new Biblioteca(4, 'Nacional da Áustria'));
    this.lista.push(new Biblioteca(5, 'Trinity College Library'));

    let bibliotecaNovo = history.state.bibliotecaNovo;
    let bibliotecaEditado = history.state.bibliotecaEditado;

    if (bibliotecaNovo) {
      bibliotecaNovo.id = this.lista.length + 1;
      this.lista.push(bibliotecaNovo);
    }

    if (bibliotecaEditado) {
      let indice = this.lista.findIndex(x => { return x.id == bibliotecaEditado.id })
      this.lista[indice] = bibliotecaEditado;

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
        let indice = this.lista.findIndex(x => { return x.id == id })
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
    this.bibliotecaEdit = new Biblioteca(0, '')
    this.modalRef = this.modalService.open(this.modalBibliotecaDetails);
  }

  edit(biblioteca: Biblioteca) {
    this.bibliotecaEdit = Object.assign({}, biblioteca);
    this.modalRef = this.modalService.open(this.modalBibliotecaDetails);
  }

  retornoDetails(biblioteca: Biblioteca) {
    if (biblioteca.id <= 0) {
      this.lista.push(biblioteca)
      biblioteca.id = this.lista.length;
    } else {
      let indice = this.lista.findIndex(x => { return x.id == biblioteca.id });
      this.lista[indice] = biblioteca;
    }
    this.modalRef.close();
  }
}
