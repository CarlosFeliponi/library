import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Autor } from '../../../models/autor';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AutoresdetailsComponent } from '../autoresdetails/autoresdetails.component';
import { AutorService } from '../../../services/autor.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-autoreslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, AutoresdetailsComponent],
  templateUrl: './autoreslist.component.html',
  styleUrl: './autoreslist.component.scss'
})
export class AutoreslistComponent {
  lista: Autor[] = [];
  autorEdit: Autor = new Autor(0, "");

  // ELEMENTOS DA MODAL
  modalService = inject(MdbModalService);  //Para conseguir abrir a modal
  @ViewChild("modalAutorDetails") modalAutorDetails!: TemplateRef<any>; //ng-template(HTML) ->  TemplateRef(ts) -> Viewchield é um objeto do TemplateRef
  modalRef!: MdbModalRef<any>;

  autorService = inject(AutorService);

  constructor() {

    this.listAll();
    // this.lista.push(new Autor(1, 'J. R. R. Tolkien'));
    // this.lista.push(new Autor(2, 'George R. R. Martin'));
    // this.lista.push(new Autor(3, 'J. K. Rowling'));
    // this.lista.push(new Autor(4, 'Blake Crouch'));
    // this.lista.push(new Autor(5, 'William Shakespeare'));

    let autorNovo = history.state.autorNovo;
    let autorEditado = history.state.autorEditado;

    if (autorNovo) {
      // autorNovo.id = this.lista.length + 1;
      this.lista.push(autorNovo);
    }

    if (autorEditado) {
      let indice = this.lista.findIndex(x => { return x.id == autorEditado.id })
      this.lista[indice] = autorEditado;
    }
  }

  listAll() {
    this.autorService.listAll().subscribe({
      next: value => {
        this.lista = value;
      }, error: erro => {
        alert("Erro com exemplo de tratamento");
        console.error(erro);
      },
    })
  }

  deleteById(id: number) {
    // Swal.fire({
    //   title: 'Tem certeza?',
    //   icon: 'warning',
    //   showConfirmButton: true,
    //   showDenyButton: true,
    //   confirmButtonText: "Sim!",
    //   cancelButtonText: "Não!",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     let indice = this.lista.findIndex(x => { return x.id == id })
    //     this.lista.splice(indice, 1);

    //     Swal.fire({
    //       title: 'Deletado com sucesso!',
    //       icon: 'success',
    //       confirmButtonText: 'OK'
    //     })
    //   }
    // });

    Swal.fire({
      title: 'Tem certeza?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim!",
      cancelButtonText: "Não!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.autorService.delete(id).subscribe({
          next: value => {
            Swal.fire({
              title: value,
              icon: 'success',
              confirmButtonText: 'OK'
            })
            this.listAll();
          },
          error: erro => {
            Swal.fire({
              title: erro,
              icon: 'error',
              confirmButtonText: 'OK'
            })
          }
        })
      }
    })
  }

  new() {
    this.autorEdit = new Autor(0, "");
    this.modalRef = this.modalService.open(this.modalAutorDetails);
  }

  edit(autor: Autor) {
    // this.autorEdit = autor; 
    this.autorEdit = Object.assign({}, autor); //clonando para evitar referencia de objetos
    this.modalRef = this.modalService.open(this.modalAutorDetails);
  }

  retornoDetails(autor: Autor) {
    // if (autor.id <= 0) {
    //   // autor.id = this.lista.length; //adiciona depois que o autor já esta na lista, por conta disso não adicionamos +1 no length
    //   this.lista.push(autor);
    // } else {
    //   let indice = this.lista.findIndex(x => { return x.id == autor.id })
    //   this.lista[indice] = autor;
    // }

    this.listAll();
    this.modalRef.close();
  }
}
