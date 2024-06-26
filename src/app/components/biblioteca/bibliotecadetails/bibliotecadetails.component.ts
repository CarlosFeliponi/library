import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Biblioteca } from '../../../models/biblioteca';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bibliotecadetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './bibliotecadetails.component.html',
  styleUrl: './bibliotecadetails.component.scss'
})
export class BibliotecadetailsComponent {
  @Input("biblioteca") biblioteca: Biblioteca = new Biblioteca(0, '');
  @Output("retorno") retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    let bibliotecaRetornado: Biblioteca = new Biblioteca(id, "Biblioteca Nacional de Praga");
    this.biblioteca = bibliotecaRetornado;
  }

  save() {
    if (this.biblioteca.id > 0) {
      alert("Biblioteca editado")
      this.router2.navigate(['admin/bibliotecas'], { state: { bibliotecaEditado: this.biblioteca } })
    } else {
      alert("Biblioteca salvo")
      this.router2.navigate(['admin/bibliotecas'], { state: { bibliotecaNovo: this.biblioteca } })
    }
    this.retorno.emit(this.biblioteca);
  }
}
