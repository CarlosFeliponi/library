import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Autor } from '../../../models/autor';
import { ActivatedRoute, Router } from '@angular/router';

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
  
  constructor(){
    let id = this.router.snapshot.params['id'];
    if(id > 0) {
      this.findById(id);
    }
  }
  
  findById(id: number){
    // let autorRetornado!: Autor;
    let autorRetornado: Autor = new Autor(id,'J. R. R. Tolkien'); //realizar de forma que capture o id na hora de editar, nome estatico pois apenas com modal vamos fazer de forma "dinamica" 
    this.autor = autorRetornado; //adiciona no objeto já criado para assim poder interpolar no campo de input
    //a logica é: caso o user veio pelo botao new, ele vai preencher o input de forma vazia, caso seja editar, ele vai capturar o id com "findByID_fake" e vai jogar no obj autor 
  }
  
  save() {
    if (this.autor.id_autor > 0){
      alert("Autor editado")
      this.router2.navigate(['admin/autores'], {state: {autorEditado: this.autor}})
      
    } else {
      alert("Autor salvo")
      this.router2.navigate(['admin/autores'], {state: {autorNovo: this.autor}})
    }
    this.retorno.emit(this.autor);
   }
}
