import { Component, EventEmitter, Input, Output, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Editora } from '../../../models/editora';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EditoraService } from '../../../services/editora.service';

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

  editoraService = inject(EditoraService);

  constructor() {
    let editoraRecebida = this.router.snapshot.params['id'];

    if (editoraRecebida > 0) {
      this.findById(editoraRecebida);
    }
  }

  findById(id: number) {
    this.editoraService.findById(id).subscribe({
      next: value => {
        this.editora = value;
      }, error: erro => {
        alert("Ocorreu um erro!");
        console.error(erro);
      }
    });
  }

  save() {
    if (this.editora.id <= 0) {
      this.editoraService.save(this.editora).subscribe({
        next: value => {
          alert(value);   
          this.router2.navigate(['admin/editoras']);       
          this.retorno.emit();
        }, error: erro => {
          alert("Ocorreu um erro!");
          console.error(erro);
        }
      }); 
    } else {
      this.editoraService.update(this.editora).subscribe({
        next: value => {
          alert(value);
          this.router2.navigate(['admin/editoras']);
          this.retorno.emit();
        }, error: erro => {
          alert("Ocorreu um erro!");
          console.error(erro);
        }
      });
    }
  }
}
