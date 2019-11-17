import {Component} from '@angular/core';
import {WycieczkiSerwisService} from './services/wycieczki-serwis.service';
import {Wycieczka} from './models/wycieczka.model';

@Component({
  selector: 'wycieczki',
  templateUrl: './wycieczki.component.html',
  styleUrls: ['./wycieczki.component.css']
})
export class WycieczkiComponent {
  items: Wycieczka[];

  constructor(wycieczkiService: WycieczkiSerwisService) {
    this.items = wycieczkiService.getProducts();
  }

}
