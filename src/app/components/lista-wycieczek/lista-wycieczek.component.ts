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
        <div class="col-2 filter-section">

          <form
            [formGroup]="filterForm"
          >
            <div class="form-group">
              <label>Docelowy kraj wycieczki:</label>

              <angular2-multiselect [data]="this.dropdownList"
                                    formControlName="docelowyKrajWycieczki"
                                    [settings]="{text: 'Wybierz'}"
                                    [(ngModel)]="selectedItems"
              >
              
              </angular2-multiselect>
              
              <hr/>

              <label>Cena minimalna:</label>
              <input name="priceMin" formControlName="priceMin" class="form-control" type="number" min="0"
                     max="100000"/>

              <label>Cena maksymalna:</label>
              <input name="priceMax" formControlName="priceMax" class="form-control" type="number" min="0"
                     max="100000"/>

              <hr/>

              <label>Średnia ocena:</label>
              <input name="avgRating" formControlName="avgRating" class="form-control" type="number" min="0" max="5"
                     step="0.1"/>
            </div>
          </form>


        </div>
        <div class="col-10">
          <div class="row">

            <wycieczka-component
              class="col-lg-4 col-md-6 col-sm-12 col-12"
              *ngFor="let item of wycieczki  | equityfilter: getFilteringCriteria()"
              [wycieczka]="item"
              [isCheapest]="(item==minPriceTrip)"
              [isMostExpensive]="(item==maxPriceTrip)"
              (reservationChanged)="calculateSumOfReservedTrips($event)"
              (tripRemoved)="removeTrip($event)"
              (tripAddedToCart)="addTripToCart($event)"
            ></wycieczka-component>
          </div>
        </div>
      </div>
    </div>

    <div
      class="total-trips shadow mb-4"
      [ngClass]="{
        'low-sum': (sum <10),
        'high-sum': (sum >=10)
      }"
    >
      Suma zarezerwowanych wycieczek: {{sum}}
    </div>

    <new-wycieczka-component></new-wycieczka-component>
  `,
})
export class ListaWycieczekComponent implements OnInit {
  filterForm: FormGroup;
  dropdownList = [];
  selectedItems;

  wycieczki;

  koszykService: KoszykService;

  minPriceTrip: any;
  maxPriceTrip: any;
  sum = 0;

  wycieczkiService: WycieczkiSerwisService;


  constructor(koszykService: KoszykService, wycieczkiService: WycieczkiSerwisService) {
    this.koszykService = koszykService;
    this.wycieczkiService = wycieczkiService;
  }

  ngOnInit() {
    const countries = this.wycieczkiService.getProducts().map(wycieczka => wycieczka.docelowyKrajWycieczki);
    const uniqCountries = [...new Set(countries)];
    this.dropdownList = uniqCountries.map((country, index) => {
      return {
        id: index,
        itemName: country
      }
    });

    this.selectedItems = [
      ];


    this.getProducts();
    this.findMinElement();
    this.findMaxElement();

    this.filterForm = new FormGroup({
      docelowyKrajWycieczki: new FormControl([]),
      priceMin: new FormControl(this.minPriceTrip.cenaJednostkowa),
      priceMax: new FormControl(this.maxPriceTrip.cenaJednostkowa),
      avgRating: new FormControl(4.0),
      // TODO: show only relevant values
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
    this.minPriceTrip = this.wycieczki.reduce((prev, current) => {
      return (prev.cenaJednostkowa < current.cenaJednostkowa) ? prev : current
    });
  }

  findMaxElement() {
    this.maxPriceTrip = this.wycieczki.reduce((prev, current) => {
      return (prev.cenaJednostkowa > current.cenaJednostkowa) ? prev : current
    });
  }

  getProducts() {
    this.wycieczki = this.wycieczkiService.getProducts();
  }

  getFilteringCriteria() {
    const criteria = [];

    const searchedCountries = this.filterForm.get('docelowyKrajWycieczki').value.map(value => value.itemName.toLowerCase());

    const priceMin = this.filterForm.get('priceMin').value;
    const priceMax = this.filterForm.get('priceMax').value;
    const avgRating = this.filterForm.get('avgRating').value;

    if(searchedCountries && searchedCountries.length>0) {
      const searchedCountryCriteria = ((item) => {return searchedCountries.includes(item['docelowyKrajWycieczki'].toLowerCase())});
      criteria.push(searchedCountryCriteria);
    }

    if((priceMin != '') && (priceMax != '')) {
      const priceMinInt = parseInt(priceMin);
      const priceMaxInt = parseInt(priceMax);

      const priceCriteria = ((item) => {
        const isAboveBottom = item.cenaJednostkowa >= priceMinInt;
        const isBelowTop = item.cenaJednostkowa <= priceMaxInt;
        return isAboveBottom && isBelowTop;
      });
      criteria.push(priceCriteria);
    }

    if(avgRating != '') {
      const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

      const ratingCriteria = ((item) => {
        return (item.oceny.length == 0) || average(item.oceny) >= avgRating;
      });
      criteria.push(ratingCriteria);
    }

    return criteria;
  }
}
