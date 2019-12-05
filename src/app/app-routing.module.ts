import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ListaWycieczekComponent} from "./components/lista-wycieczek/lista-wycieczek.component";
import {KoszykComponent} from "./components/koszyk/koszyk.component";
import {WycieczkaDetalComponent} from "./components/wycieczka-detal/wycieczka-detal.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {AuthGuard} from './guards/auth.guard';
import {NewWycieczkaComponent} from './components/new-wycieczka/new-wycieczka.component';
import {AfterOrderComponent} from './components/after-order/after-order.component';
import {ViewMyOrdersComponent} from "./components/view-my-orders/view-my-orders.component";
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";
import {EditWycieczkaComponent} from "./components/edit-wycieczka/edit-wycieczka.component";

const routes: Routes = [
  {path: '', redirectTo: '/wycieczki', pathMatch: 'full'},
  {path: 'wycieczki', component: ListaWycieczekComponent, canActivate: [AuthGuard]},
  {path: 'koszyk', component: KoszykComponent, canActivate: [AuthGuard]},
  {path: 'wycieczka/:id', component: WycieczkaDetalComponent, canActivate: [AuthGuard]},
  {path: 'login', component: SignInComponent},
  {path: 'add-trip', component: NewWycieczkaComponent},
  {path: 'after-order/:id', component: AfterOrderComponent},
  {path: 'view-my-orders', component: ViewMyOrdersComponent},
  {path: 'admin-panel', component: AdminPanelComponent},
  {path: 'edit-trip/:id', component: EditWycieczkaComponent},
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
