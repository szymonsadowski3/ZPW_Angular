import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ListaWycieczekComponent} from "./components/lista-wycieczek/lista-wycieczek.component";
import {KoszykComponent} from "./components/koszyk/koszyk.component";
import {WycieczkaDetalComponent} from "./components/wycieczka-detal/wycieczka-detal.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {AuthGuard} from './guards/auth.guard';
import {NewWycieczkaComponent} from './components/new-wycieczka/new-wycieczka.component';

const routes: Routes = [
  {path: '', redirectTo: '/wycieczki', pathMatch: 'full'},
  {path: 'wycieczki', component: ListaWycieczekComponent, canActivate: [AuthGuard]},
  {path: 'koszyk', component: KoszykComponent, canActivate: [AuthGuard]},
  {path: 'wycieczka/:id', component: WycieczkaDetalComponent, canActivate: [AuthGuard]},
  {path: 'login', component: SignInComponent},
  {path: 'add-trip', component: NewWycieczkaComponent},
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
