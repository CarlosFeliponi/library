import { Component, EventEmitter, Input, Output, inject, output } from '@angular/core';
import { Livro } from '../../../models/livro';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { LivroService } from '../../../services/livro.service';

@Component({
  selector: 'app-livrosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './livrosdetails.component.html',
  styleUrl: './livrosdetails.component.scss'
})
export class LivrosdetailsComponent {
  @Input("livro") livro: Livro = new Livro(0, '');
  @Output("retorno") retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  livroService = inject(LivroService);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.livroService.findById(id).subscribe({
      next: value => {
        this.livro = value;        
      }, error: erro => {
        alert("Ocorreu um erro!");
        console.error(erro);
      }
    });

    let livroRetornado: Livro = new Livro(id, "O senhor do anéis");
    this.livro = livroRetornado;
  }

  save() {
    if (this.livro.id > 0) {
      this.livroService.update(this.livro).subscribe({
        next: value => {
          alert(value)
          this.router2.navigate(['admin/livros'], { state: { livroEditado: this.livro } })
          this.retorno.emit(this.livro);
        }, error: erro => {
          alert("Ocorreu um erro!");
          console.error(erro);
        }        
      })
    } else {
      this.livroService.save(this.livro).subscribe({
        next: value => {
          alert(value);
          this.router2.navigate(['admin/livros'], { state: { livroNovo: this.livro } });
          this.retorno.emit(this.livro);
        }, error: erro => {
          alert("Ocorreu um erro!");
          console.error(erro);
        }
      });
    }
  }
}
