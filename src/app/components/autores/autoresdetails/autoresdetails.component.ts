import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Autor } from '../../../models/autor';
import { ActivatedRoute, Router } from '@angular/router';
import { AutorService } from '../../../services/autor.service';

@Component({
  selector: 'app-autoresdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './autoresdetails.component.html',
  styleUrl: './autoresdetails.component.scss'
})
export class AutoresdetailsComponent {
  @Input("autor") autor: Autor = new Autor(0, ""); //deve ser preenjito de forma vazia, para caso cheja um new, ele vai preencher o campo do input de forma vazia e não vão ocorrer erro no log
  @Output("retorno") retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute); // snapshot.params
  router2 = inject(Router); //navegate

  autorService = inject(AutorService);
  
  constructor(){
    let id = this.router.snapshot.params['id'];
    if(id > 0) {
      this.findById(id);
    }
  }
  
  findById(id: number){
    // let autorRetornado!: Autor;
    //->let autorRetornado: Autor = new Autor(id,'J. R. R. Tolkien'); //realizar de forma que capture o id na hora de editar, nome estatico pois apenas com modal vamos fazer de forma "dinamica" 
    //->this.autor = autorRetornado; //adiciona no objeto já criado para assim poder interpolar no campo de input
    //a logica é: caso o user veio pelo botao new, ele vai preencher o input de forma vazia, caso seja editar, ele vai capturar o id com "findByID_fake" e vai jogar no obj autor 

    this.autorService.findById(id).subscribe({
      next: value => {
        this.autor = value;
      }, error: erro => {
        alert("Ocorreu um erro!");
        console.error(erro);
      }
    })
  }
  
  save() {
    if (this.autor.id > 0){
      // alert("Autor editado")
      this.autorService.update(this.autor).subscribe({
        next: value => {
          alert(value)
          this.router2.navigate(['admin/autores'], {state: {autorEditado: this.autor}})
          this.retorno.emit(this.autor);
        }, error: erro => {
          alert("Ocorreu um erro!");
          console.error(erro);
        }
      })
    } else {
      this.autorService.save(this.autor).subscribe({
        next: value => { 
          alert(value)
          this.router2.navigate(['admin/autores'], {state: {autorNovo: this.autor}})
          this.retorno.emit(this.autor);
        }, error: erro => {
          alert("Ocorreu um erro!");
          console.error(erro);
        }
      })
    }
    // this.retorno.emit(this.autor);
   }
}
