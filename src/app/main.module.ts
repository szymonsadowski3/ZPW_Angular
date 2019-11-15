import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WycieczkiComponent } from './wycieczki.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HeaderComponent} from "./components/header.component";
import {ListaWycieczekComponent} from "./components/lista-wycieczek.component";
import {WycieczkaComponent} from "./components/wycieczka.component";

@NgModule({
  providers: [
    { provide: 'Window',  useValue: window }
  ],
  declarations: [
    WycieczkiComponent,
    HeaderComponent,
    ListaWycieczekComponent,
    WycieczkaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  bootstrap: [WycieczkiComponent]
})
export class MainModule { }
