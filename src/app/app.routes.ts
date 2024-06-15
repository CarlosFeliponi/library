import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { AutoreslistComponent } from './components/autores/autoreslist/autoreslist.component';
import { AutoresdetailsComponent } from './components/autores/autoresdetails/autoresdetails.component';
import { EditoraslistComponent } from './components/editoras/editoraslist/editoraslist.component';
import { EditorasdetailsComponent } from './components/editoras/editorasdetails/editorasdetails.component';
import { LivroslistComponent } from './components/livros/livroslist/livroslist.component';
import { LivrosdetailsComponent } from './components/livros/livrosdetails/livrosdetails.component';
import { BibliotecalistComponent } from './components/biblioteca/bibliotecalist/bibliotecalist.component';
import { BibliotecadetailsComponent } from './components/biblioteca/bibliotecadetails/bibliotecadetails.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },

    { path: 'admin', 
    component: PrincipalComponent, 
    children: [
        { path: 'autores', component: AutoreslistComponent },
        { path: 'autores/new', component: AutoresdetailsComponent },
        { path: 'autores/edit/:id', component: AutoresdetailsComponent },
        { path: 'editoras', component: EditoraslistComponent },
        { path: 'editoras/new', component: EditorasdetailsComponent },
        { path: 'editoras/edit/:id', component: EditorasdetailsComponent },
        { path: 'livros', component: LivroslistComponent },
        { path: 'livros/new', component: LivrosdetailsComponent },
        { path: 'livros/edit/:id', component: LivrosdetailsComponent },
        { path: 'bibliotecas', component: BibliotecalistComponent },
        { path: 'bibliotecas/new', component: BibliotecadetailsComponent },
        { path: 'bibliotecas/edit/:id', component: BibliotecadetailsComponent },
    ]}
];
