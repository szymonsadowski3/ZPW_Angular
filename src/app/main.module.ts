import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AplikacjaWycieczkiComponent } from './aplikacja-wycieczki.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HeaderComponent} from './components/header/header.component';
import {ListaWycieczekComponent} from './components/list-wycieczek/lista-wycieczek.component';
import {WycieczkaComponent} from './components/wycieczka/wycieczka.component';
import {OcenaComponent} from './components/ocena/ocena.component';
import {RatingModule} from 'ng-starrating';
import {NewWycieczkaComponent} from './components/new-wycieczka/new-wycieczka.component';

@NgModule({
  providers: [
    { provide: 'Window',  useValue: window }
  ],
  declarations: [
    AplikacjaWycieczkiComponent,
    HeaderComponent,
    ListaWycieczekComponent,
    WycieczkaComponent,
    OcenaComponent,
    NewWycieczkaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
    ReactiveFormsModule
  ],
  bootstrap: [AplikacjaWycieczkiComponent]
})
export class MainModule { }
