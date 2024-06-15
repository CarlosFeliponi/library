import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Editora } from '../../../models/editora';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { EditorasdetailsComponent } from '../editorasdetails/editorasdetails.component';

@Component({
  selector: 'app-editoraslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, EditorasdetailsComponent],
  templateUrl: './editoraslist.component.html',
  styleUrl: './editoraslist.component.scss'
})
export class EditoraslistComponent {
  lista: Editora[] = [];

  editoraEdit: Editora = new Editora(0, '');

  // ELEMENTOS DA MODAL
  modalService = inject(MdbModalService); //Para conseguir abrir a modal
  @ViewChild("modalEditoraDetails") modalEditoraDetails!: TemplateRef<any>;//ng-template(HTML) ->  TemplateRef(ts) -> Viewchield é um objeto do TemplateRef
  modalRef!: MdbModalRef<any>;

  constructor() {
    this.lista.push(new Editora(1, 'DarkSide'));
    this.lista.push(new Editora(2, 'Intrínseca'));
    this.lista.push(new Editora(3, 'Editora Globo'));
    this.lista.push(new Editora(4, 'Grupo Companhia das Letras'));
    this.lista.push(new Editora(5, 'Grupo Editorial Alta Books'));

    let editoraNovo = history.state.editoraNovo;
    let editoraEditado = history.state.editoraEditado;

    if (editoraNovo) {
      this.lista.push(editoraNovo)
    }

    if (editoraEditado) {
      let indice = this.lista.findIndex(x => { return x.id_editora == editoraEditado.id_editora })
      this.lista[indice] = editoraEditado;
    }
  }

  deleteById(id_editora: number) {

    Swal.fire({
      title: 'Tem certeza?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim!",
      cancelButtonText: "Não!",
    }).then((result) => {
      if (result.isConfirmed) {
        let indice = this.lista.findIndex(x => { return x.id_editora == id_editora })

        if (indice != -1) {
          this.lista.splice(indice, 1);
          Swal.fire({
            title: 'Deletado com sucesso!',
            icon: 'success',
            confirmButtonText: 'OK'
          })
        }

      }
    });
  }

  new() {
    this.editoraEdit = new Editora(0, '');
    this.modalRef = this.modalService.open(this.modalEditoraDetails);
  }

  edit(editora: Editora) {
    this.editoraEdit = Object.assign({}, editora); //Clona para evitar referencia de objeto
    this.modalRef = this.modalService.open(this.modalEditoraDetails)
  }

  retornoDetails(editora: Editora) {
    if (editora.id_editora <= 0) {
      this.lista.push(editora);
      editora.id_editora = this.lista.length;
    } else {
      let indice = this.lista.findIndex(x => { return x.id_editora == editora.id_editora });
      this.lista[indice] = editora;
    }
    this.modalRef.close();
  }
}
