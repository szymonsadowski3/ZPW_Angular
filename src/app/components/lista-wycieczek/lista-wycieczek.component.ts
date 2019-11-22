import {Component, OnInit} from '@angular/core';
import {KoszykService} from "../../services/koszyk.service";
import {WycieczkiSerwisService} from "../../services/wycieczki-serwis.service";

@Component({
  styleUrls: ['./lista-wycieczek.component.css'],
  selector: 'lista-wycieczek-component',
  template: `
    <div class="lista-wycieczek">
      <h1 class="mt-4 mb-4">Lista dostępnych wycieczek</h1>

      <div class="row itemsBlock">
        <div class="col-2">
          Tutaj będzie filtrowanie
        </div>
        <div class="col-10">
          <div class="row">

            <wycieczka-component
              class="col-lg-4 col-md-6 col-sm-12 col-12"
              *ngFor="let item of wycieczki"
              [wycieczka]="item"
              [isCheapest]="(item==minElement)"
              [isMostExpensive]="(item==maxElement)"
              (reservationChanged)="calculateSumOfReservedTrips($event)"
              (tripRemoved)="removeTrip($event)"
              (tripAddedToCart)="addTripToCart($event)"
            ></wycieczka-component>  
          </div>
        </div>
      </div>

      <span
        class="total-trips shadow mb-4"
        [ngClass]="{
        'low-sum': (sum <10),
        'high-sum': (sum >=10)
      }"
      >
      Suma zarezerwowanych wycieczek: {{sum}}
    </span>
    </div>

    <new-wycieczka-component></new-wycieczka-component>
  `,
})
export class ListaWycieczekComponent implements OnInit {
  wycieczki;

  koszykService: KoszykService;

  minElement: any;
  maxElement: any;
  sum = 0;

  wycieczkiService: WycieczkiSerwisService;


  constructor(koszykService: KoszykService, wycieczkiService: WycieczkiSerwisService) {
    this.koszykService = koszykService;
    this.wycieczkiService = wycieczkiService;
  }

  ngOnInit() {
    this.getProducts();
    this.findMinElement();
    this.findMaxElement();
  }

  calculateSumOfReservedTrips(message) {
    console.log(message);

    this.sum = this.wycieczki.reduce((a, b) => {
      return a + b.ileZarezerwowano;
    }, 0);
  }

  removeTrip(trip) {
    this.wycieczki = this.wycieczki.filter(item => item !== trip);
    this.findMinElement();
    this.findMaxElement();
  }

  addTripToCart(trip) {
    this.koszykService.addProduct(trip);
  }

  findMinElement() {
    this.minElement = this.wycieczki.reduce((prev, current) => {
      return (prev.cenaJednostkowa < current.cenaJednostkowa) ? prev : current
    });
  }

  findMaxElement() {
    this.maxElement = this.wycieczki.reduce((prev, current) => {
      return (prev.cenaJednostkowa > current.cenaJednostkowa) ? prev : current
    });
  }

  getProducts() {
    this.wycieczki = this.wycieczkiService.getProducts();
  }
}
