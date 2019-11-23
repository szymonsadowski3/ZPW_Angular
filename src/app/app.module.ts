import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AplikacjaWycieczkiComponent} from './aplikacja-wycieczki.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './components/header/header.component';
import {ListaWycieczekComponent} from './components/lista-wycieczek/lista-wycieczek.component';
import {WycieczkaComponent} from './components/wycieczka/wycieczka.component';
import {OcenaComponent} from './components/ocena/ocena.component';
import {RatingModule} from 'ng-starrating';
import {NewWycieczkaComponent} from './components/new-wycieczka/new-wycieczka.component';
import {TooltipModule} from 'ng2-tooltip-directive';
import {WycieczkaDetalComponent} from "./components/wycieczka-detal/wycieczka-detal.component";
import {KoszykComponent} from './components/koszyk/koszyk.component';
import {AppRoutingModule} from './app-routing.module';
import {EquityFilterPipe} from "./pipes/equity-filter.pipe";
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {Angular2ImageGalleryModule} from "angular2-image-gallery";
import {AngularDateTimePickerModule} from "angular2-datetimepicker";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {FakeDanService} from "./services/fake-dane.service";



@NgModule({
  providers: [
    {provide: 'Window', useValue: window}
  ],
  declarations: [
    AplikacjaWycieczkiComponent,
    HeaderComponent,
    ListaWycieczekComponent,
    WycieczkaComponent,
    OcenaComponent,
    NewWycieczkaComponent,
    KoszykComponent,
    EquityFilterPipe,
    WycieczkaDetalComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
    TooltipModule,
    AppRoutingModule,
    AngularMultiSelectModule,
    Angular2ImageGalleryModule,
    AngularDateTimePickerModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(FakeDanService),
  ],
  bootstrap: [AplikacjaWycieczkiComponent]
})
export class AppModule {
}
