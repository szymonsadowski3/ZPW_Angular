import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'wycieczka-component',
  styleUrls: ['./wycieczka.component.css'],
  template: `


    <div class="card mb-4" style="width: 18rem;"
         [ngClass]="{
                'low-available-places': (wycieczka.maxIloscMiejsc - wycieczka.ileZarezerwowano) <= 3,
                'cheapest': isCheapest,
                'most-expensive': isMostExpensive
             }"
    >
      <button
        class="btn remove-button"
        (click)="onTripRemoved(wycieczka)"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="btn add-to-cart-button"
        (click)="onTripAddedToCart(wycieczka)"
      >
        <i class="fa fa-plus"></i>
      </button>
      <img src={{wycieczka.linkDoZdj}} class="rounded-circle card-img"/>
      <div class="card-body">
        <h5 class="card-title">{{wycieczka.nazwa | uppercase}}</h5>
        <p class="card-text">{{wycieczka.opis}}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Kraj docelowy: {{wycieczka.docelowyKrajWycieczki | uppercase}}</li>
        <li class="list-group-item">
          <i class="fas fa-clock"></i> {{wycieczka.dataRozpoczecia}} - {{wycieczka.dataZakonczenia}}
          <i class="fas fa-clock"></i>
        </li>
        <li class="list-group-item">
          <i class="fas fa-dollar-sign"></i> Cena: {{wycieczka.cenaJednostkowa | currency: 'EUR'}}
        </li>
        <li class="list-group-item">
          <i class="far fa-arrow-alt-circle-down"></i> Max ilość miejsc: {{wycieczka.maxIloscMiejsc}}
        </li>
        <li class="list-group-item">
          <div *ngIf="wycieczka.ileZarezerwowano == wycieczka.maxIloscMiejsc; else availablePlaces">
            Brak dostępnych miejsc!
          </div>

          <ng-template #availablePlaces>
            Ile zarezerwowano: {{wycieczka.ileZarezerwowano}}
          </ng-template>
        </li>
      </ul>
      <div class="card-body">
        <button
          class="btn btn-primary plus-button"
          [ngClass]="{'hidden-button': wycieczka.ileZarezerwowano == wycieczka.maxIloscMiejsc}"
          (click)="onClickPlusButton(wycieczka)"
        >
          <i class="fa fa-plus"></i>
        </button>

        <button
          class="btn btn-warning minus-button"
          [ngClass]="{'hidden-button': wycieczka.ileZarezerwowano == 0}"
          (click)="onClickMinusButton(wycieczka)"
        >
          <i class="fa fa-minus"></i>
        </button>
      </div>
      <div class="card-body">
        <ocena-component
          (ratingAdded)="addRating($event)"
        ></ocena-component>
        
        {{countRatings() | json}}
      </div>
    </div>
  `,
})
export class WycieczkaComponent {
  @Input() wycieczka: any; // TODO: introduce type of wycieczka
  @Input() isCheapest: boolean;
  @Input() isMostExpensive: boolean;

  @Output() reservationChanged = new EventEmitter<string>();
  @Output() tripRemoved = new EventEmitter<any>();
  @Output() tripAddedToCart = new EventEmitter<any>();

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
    console.dir(newRating);

    this.wycieczka.oceny.push(newRating);
  }

  countRatings() {
    return this.wycieczka.oceny.reduce(function (acc, curr) {
      if (typeof acc[curr] == 'undefined') {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }

      return acc;
    }, {});
  }
}
