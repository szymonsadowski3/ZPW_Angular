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
    ></wycieczka-component>
  `,
})
export class ListaWycieczekComponent {
  @Input() wycieczki;
  @Input() minElement: any;
  @Input() maxElement: any;
}
