import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ListaWycieczekComponent} from "./components/lista-wycieczek/lista-wycieczek.component";
import {KoszykComponent} from "./components/koszyk/koszyk.component";
import {WycieczkaDetalComponent} from "./components/wycieczka-detal/wycieczka-detal.component";

const routes: Routes = [
  {path: '', redirectTo: '/wycieczki', pathMatch: 'full'},
  {path: 'wycieczki', component: ListaWycieczekComponent},
  {path: 'koszyk', component: KoszykComponent},
  {path: 'wycieczka/:id', component: WycieczkaDetalComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }