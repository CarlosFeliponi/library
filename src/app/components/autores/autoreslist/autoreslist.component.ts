import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Autor } from '../../../models/autor';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AutoresdetailsComponent } from '../autoresdetails/autoresdetails.component';

@Component({
  selector: 'app-autoreslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, AutoresdetailsComponent],
  templateUrl: './autoreslist.component.html',
  styleUrl: './autoreslist.component.scss'
})
export class AutoreslistComponent {
  lista: Autor[] = [];
  autorEdit: Autor = new Autor (0,"");

  // ELEMENTOS DA MODAL
  modalService = inject(MdbModalService);  //Para conseguir abrir a modal
  @ViewChild("modalAutorDetails") modalAutorDetails!: TemplateRef<any>; //ng-template(HTML) ->  TemplateRef(ts) -> Viewchield é um objeto do TemplateRef
  modalRef!: MdbModalRef<any>; 


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
      let indice = this.lista.findIndex(x => { return x.id_autor == autorEditado.id_autor })
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

  new() {
    this.autorEdit = new Autor (0,"");
    this.modalRef = this.modalService.open(this.modalAutorDetails);
  }

  edit(autor: Autor) {
    // this.autorEdit = autor; 
    this.autorEdit = Object.assign({}, autor); //clonando para evitar referencia de objetos
    this.modalRef = this.modalService.open(this.modalAutorDetails);
  }

  retornoDetails(autor: Autor) {
    if (autor.id_autor <= 0) {
      this.lista.push(autor);
      autor.id_autor = this.lista.length; //adiciona depois que o autor já esta na lista, por conta disso não adicionamos +1 no length
    } else {
      let indice = this.lista.findIndex(x => { return x.id_autor == autor.id_autor })
      this.lista[indice] = autor;
    }
    this.modalRef.close();
  }
}
