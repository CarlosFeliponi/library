import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Editora } from '../../../models/editora';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { EditorasdetailsComponent } from '../editorasdetails/editorasdetails.component';
import { EditoraService } from '../../../services/editora.service';

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

  editoraService = inject(EditoraService);

  constructor() {
    this.listAll();
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
        this.editoraService.delete(id).subscribe({
          next: value => {
            Swal.fire({
              title: value,
              icon: 'success',
              confirmButtonText: 'OK'
            })
            this.listAll();
          },
          error: erro => {
            alert("Erro com exemplo de tratamento");
            console.error(erro);
          }
        })
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

  retornoDetails() {
    this.listAll();
    this.modalRef.close();
  }

  listAll() {
    this.editoraService.listAll().subscribe ({
      next: value => {  
        this.lista = value;
      },error: erro => {
        alert("Erro com exemplo de tratamento");
        console.error(erro);
      },
    })
  }
  
}
