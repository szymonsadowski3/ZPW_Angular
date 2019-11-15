import {Component, Input} from '@angular/core';

@Component({
  selector: 'lista-wycieczek-component',
  template: `
    <h1 class="mt-4 mb-4">Wycieczki</h1>

    
    <wycieczka-component
         *ngFor="let item of wycieczki"
         [wycieczka]="item"
         [isCheapest]="(item==minElement)"
         [isMostExpensive]="(item==maxElement)"
         (reservationChanged)="calculateSumOfReservedTrips($event)"
         (tripRemoved)="removeTrip($event)"
    ></wycieczka-component>

    <div>
      <p
        [ngClass]="{
        'low-sum': (sum <10),
        'high-sum': (sum >=10)
      }"
      >Suma zarezerwowanych wycieczek: {{sum}}</p>
    </div>
  `,
})
export class ListaWycieczekComponent {
  @Input() wycieczki;
  @Input() minElement: any;
  @Input() maxElement: any;
  sum = 0;

  calculateSumOfReservedTrips(message) {
    console.log(message);

    this.sum = this.wycieczki.reduce((a, b) => {
      return a + b.ileZarezerwowano;
    }, 0);
  }

  removeTrip(trip) {
    this.wycieczki = this.wycieczki.filter(item => item !== trip); // TODO: recalculate min and max element when removed
  }
}
