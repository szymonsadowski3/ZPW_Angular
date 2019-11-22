import {Component, OnInit} from '@angular/core';
import {KoszykService} from "../../services/koszyk.service";
import {WycieczkiSerwisService} from "../../services/wycieczki-serwis.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  styleUrls: ['./lista-wycieczek.component.css'],
  selector: 'lista-wycieczek-component',
  template: `
    <div class="lista-wycieczek">
      <h1 class="mt-4 mb-4">Lista dostępnych wycieczek</h1>

      <div class="row itemsBlock">
        <div class="col-2">
          
          <form [formGroup]="filterForm" (ngSubmit)="onSubmit(filterForm)">
            <div class="form-group">
              <label>Docelowy kraj wycieczki:</label>
              <input name="docelowyKrajWycieczki" formControlName="docelowyKrajWycieczki" class="form-control" />
              
              <br>

              <label>Cena minimalna:</label>
              <input name="priceMin" formControlName="priceMin" class="form-control" type="number" min="0" max="100000" />

              <label>Cena maksymalna:</label>
              <input name="priceMax" formControlName="priceMax" class="form-control" type="number" min="0" max="100000" />
              
              
<!--              <label>nazwa:</label><input name="nazwa" formControlName="nazwa" class="form-control">-->
<!--              <label>docelowyKrajWycieczki:</label><input name="docelowyKrajWycieczki" formControlName="docelowyKrajWycieczki"-->
<!--                                                          class="form-control">-->
<!--              <label>dataRozpoczecia:</label><input name="dataRozpoczecia" formControlName="dataRozpoczecia" class="form-control">-->
<!--              <label>dataZakonczenia:</label><input name="dataZakonczenia" formControlName="dataZakonczenia" class="form-control">-->
<!--              <label>cenaJednostkowa:</label><input name="cenaJednostkowa" formControlName="cenaJednostkowa" class="form-control">-->
<!--              <label>maxIloscMiejsc:</label><input name="maxIloscMiejsc" formControlName="maxIloscMiejsc" class="form-control">-->
<!--              <label>opis:</label><input name="opis" formControlName="opis" class="form-control">-->
<!--              <label>linkDoZdj:</label><input name="linkDoZdj" formControlName="linkDoZdj" class="form-control">-->
              <!--<label>ileZarezerwowano:</label><input name="ileZarezerwowano" formControlName="ileZarezerwowano" class="form-control">-->
              <!--<label>oceny:</label><input name="oceny" formControlName="oceny" class="form-control">-->
            </div>

            <button class="btn btn-primary" type="submit" tooltip="Wycieczka dodana!" placement="top" trigger="click">Send</button>
          </form>
          
          
        </div>
        <div class="col-10">
          <div class="row">

            <wycieczka-component
              class="col-lg-4 col-md-6 col-sm-12 col-12"
              *ngFor="let item of wycieczki  | equityfilter: getFilteringCriteria()"
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
  filterForm: FormGroup;

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

    this.filterForm = new FormGroup({
      docelowyKrajWycieczki: new FormControl(''),
      priceMin: new FormControl(0),
      priceMax: new FormControl(100000),
    });
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

  getFilteringCriteria() {
    const criteria = [];

    const searchedCountry = this.filterForm.get('docelowyKrajWycieczki').value.toLowerCase();

    if(searchedCountry != '') {
      const searchedCountryCriteria = ((item) => {return item['docelowyKrajWycieczki'].toLowerCase().includes(searchedCountry)});
      criteria.push(searchedCountryCriteria);
    }

    return criteria;
  }
}
