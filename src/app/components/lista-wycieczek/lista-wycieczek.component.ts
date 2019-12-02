import {Component, OnInit} from '@angular/core';
import {KoszykService} from '../../services/koszyk.service';
import {WycieczkiSerwisService} from '../../services/wycieczki-serwis.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Wycieczka} from '../../models/wycieczka.model';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  styleUrls: ['./lista-wycieczek.component.css'],
  selector: 'lista-wycieczek-component',
  templateUrl: './lista-wycieczek.component.html',
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
  firebaseService: FirebaseService;


  constructor(koszykService: KoszykService, wycieczkiService: WycieczkiSerwisService, firebaseService: FirebaseService) {
    this.koszykService = koszykService;
    this.wycieczkiService = wycieczkiService;

    this.firebaseService = firebaseService;
  }

  ngOnInit() {
    this.firebaseService.fetchProducts().subscribe((products: Wycieczka[]) => {
      console.dir(products);
      this.wycieczki = products;

      const countries = products.map(wycieczka => wycieczka.docelowyKrajWycieczki);
      const uniqCountries = [...new Set(countries)];
      this.dropdownList = uniqCountries.map((country, index) => {
        return {
          id: index,
          itemName: country
        };
      });

      this.findMinElement();
      this.findMaxElement();

      this.filterForm = new FormGroup({
        docelowyKrajWycieczki: new FormControl([]),
        priceMin: new FormControl(this.minPriceTrip.cenaJednostkowa),
        priceMax: new FormControl(this.maxPriceTrip.cenaJednostkowa),
        avgRating: new FormControl(4.0),
      });
    });

    this.filterForm = this.getInitialFormGroup();

    this.selectedItems = [];
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

  getFilteringCriteria() {
    const criteria = [];

    const searchedCountries = this.filterForm.get('docelowyKrajWycieczki').value.map(value => value.itemName.toLowerCase());

    const priceMin = this.filterForm.get('priceMin').value;
    const priceMax = this.filterForm.get('priceMax').value;
    const avgRating = this.filterForm.get('avgRating').value;

    if (searchedCountries && searchedCountries.length > 0) {
      const searchedCountryCriteria = ((item) => {
        return searchedCountries.includes(item['docelowyKrajWycieczki'].toLowerCase())
      });
      criteria.push(searchedCountryCriteria);
    }

    if ((priceMin != '') && (priceMax != '')) {
      const priceMinInt = parseInt(priceMin);
      const priceMaxInt = parseInt(priceMax);

      const priceCriteria = ((item) => {
        const isAboveBottom = item.cenaJednostkowa >= priceMinInt;
        const isBelowTop = item.cenaJednostkowa <= priceMaxInt;
        return isAboveBottom && isBelowTop;
      });
      criteria.push(priceCriteria);
    }

    if (avgRating != '') {
      const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

      const ratingCriteria = ((item) => {
        return (!item.oceny || item.oceny.length === 0) || average(item.oceny) >= avgRating;
      });
      criteria.push(ratingCriteria);
    }

    return criteria;
  }

  private getInitialFormGroup() {
    return new FormGroup({
      docelowyKrajWycieczki: new FormControl([]),
      priceMin: new FormControl(0),
      priceMax: new FormControl(0),
      avgRating: new FormControl(4.0),
    });
  }
}
