import { Component, EventEmitter, Input, Output, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Editora } from '../../../models/editora';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editorasdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './editorasdetails.component.html',
  styleUrl: './editorasdetails.component.scss'
})
export class EditorasdetailsComponent {

  @Input("editora") editora: Editora = new Editora(0, '');
  @Output("retorno") retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  constructor() {
    let editoraRecebida = this.router.snapshot.params['id'];

    if (editoraRecebida > 0) {
      this.findById(editoraRecebida);
    }
  }

  findById(id: number) {
    let editoraRetornado: Editora = new Editora(id, 'DarkSide');
    this.editora = editoraRetornado;
  }

  save() {
    if (this.editora.id_editora <= 0) {
      Swal.fire({
        title: 'Editora salva!',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      // this.editora.id_editora = 555;
      this.router2.navigate(['admin/editoras'], { state: { editoraNovo: this.editora } });
    } else {
      Swal.fire({
        title: 'Editora editada!',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      this.router2.navigate(['admin/editoras'], { state: { editoraEditado: this.editora } })
    }
    this.retorno.emit(this.editora);
  }
}
