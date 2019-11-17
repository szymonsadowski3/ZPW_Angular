import {Component, OnInit} from '@angular/core';
import {WycieczkiSerwisService} from './services/wycieczki-serwis.service';
import {Wycieczka} from './models/wycieczka.model';

@Component({
  selector: 'aplikacja-wycieczki',
  templateUrl: './aplikacja-wycieczki.component.html',
  styleUrls: ['./aplikacja-wycieczki.component.css']
})
export class AplikacjaWycieczkiComponent implements OnInit {
  items: Wycieczka[];
  wycieczkiService: WycieczkiSerwisService;

  constructor(wycieczkiService: WycieczkiSerwisService) {
    this.wycieczkiService = wycieczkiService;
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.items = this.wycieczkiService.getProducts();
  }

}
