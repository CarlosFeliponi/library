import { Component, inject } from '@angular/core';
import { Livro } from '../../../models/livro';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-livrosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './livrosdetails.component.html',
  styleUrl: './livrosdetails.component.scss'
})
export class LivrosdetailsComponent {
  livro: Livro = new Livro(0, '');

  router = inject(ActivatedRoute);

  router2 = inject(Router);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    let livroRetornado: Livro = new Livro(id, "O senhor do anéis");
    this.livro = livroRetornado;
  }

  save() {
    if (this.livro.id_livro > 0) {
      alert("Livro editado")
      this.router2.navigate(['admin/livros'], { state: { livroEditado: this.livro } })
    } else {
      alert("Livro salvo")
      this.router2.navigate(['admin/livros'], { state: { livroNovo: this.livro } })
    }
  }
}
