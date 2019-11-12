import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WycieczkiComponent } from './wycieczki.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HeaderComponent} from "./components/header.component";

@NgModule({
  providers: [
    { provide: 'Window',  useValue: window }
  ],
  declarations: [
    WycieczkiComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  bootstrap: [WycieczkiComponent]
})
export class MainModule { }
