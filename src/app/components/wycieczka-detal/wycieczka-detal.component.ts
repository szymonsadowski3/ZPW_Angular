import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {WycieczkiSerwisService} from "../../services/wycieczki-serwis.service";
import {ActivatedRoute} from "@angular/router";
import {KoszykService} from "../../services/koszyk.service";

@Component({
  selector: 'wycieczka-detal-component',
  styleUrls: ['./wycieczka-detal.component.css'],
  templateUrl: 'wycieczka-detal.component.html',
})
export class WycieczkaDetalComponent implements OnInit {
  wycieczkiService: WycieczkiSerwisService;
  koszykService: KoszykService;
  route;

  preferreddDate: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false
  };

  wycieczka: any;
  @Output() reservationChanged = new EventEmitter<string>();
  @Output() tripRemoved = new EventEmitter<any>();
  @Output() tripAddedToCart = new EventEmitter<any>();

  constructor(wycieczkiService: WycieczkiSerwisService, koszykService: KoszykService, route:ActivatedRoute) {
    this.wycieczkiService = wycieczkiService;
    this.koszykService = koszykService;
    this.route = route;

    this.wycieczka = this.getInitialBlankObject();
  }

  ngOnInit() {
    const wycieczkaId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.wycieczkiService.getProduct(wycieczkaId).subscribe(response => {
      this.wycieczka = response;
    });
  }

  onClickPlusButton(item) {
    if (item.ileZarezerwowano < item.maxIloscMiejsc) {
      item.ileZarezerwowano += 1;
      console.log(`Zarezerwowano miejsce na wycieczkę ${item.nazwa}`);
    } else {
      console.log(`Max ilosc miejsc na wycieczkę ${item.nazwa} zostala osiagnieta`);
    }

    this.reservationChanged.emit('added');
  }

  onClickMinusButton(item) {
    if (item.ileZarezerwowano > 0) {
      item.ileZarezerwowano -= 1;
      console.log(`Zrezygnowano z miejsca na wycieczkę ${item.nazwa}`);
    } else {
      console.log(`Nie mozna zrezygnowac z wycieczki ${item.nazwa}`);
    }

    this.reservationChanged.emit('removed');
  }

  onTripRemoved(trip) {
    this.tripRemoved.emit(trip);
  }

  onTripAddedToCart(trip) {
    this.tripAddedToCart.emit(trip);
  }

  addRating(newRating) {
    this.wycieczka.oceny.push(newRating);
  }

  countRatings() {
    return ((this.wycieczka.oceny != undefined) && (this.wycieczka.oceny.length > 0)) ? Object.entries(this.wycieczka.oceny.reduce(function (acc, curr) {
      if (typeof acc[curr] == 'undefined') {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }

      return acc;
    }, {})): [];
  }

  didPersonReserveTrip(trip) {
    // TODO: for now it's only a mock
    return trip.ileZarezerwowano>0;
  }

  getInitialBlankObject() {
    return {
      id: 1,
      nazwa: "",
      docelowyKrajWycieczki: "",
      dataRozpoczecia: "",
      dataZakonczenia: "",
      cenaJednostkowa: 0,
      maxIloscMiejsc: 0,
      opis: "",
      linkDoZdj: "",
      ileZarezerwowano: 0,
      oceny: [],
    };
  }
}
