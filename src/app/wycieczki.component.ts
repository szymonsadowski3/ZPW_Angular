import {Component, OnInit} from '@angular/core';
import {WycieczkiSerwisService} from './services/wycieczki-serwis.service';
import {Wycieczka} from './models/wycieczka.model';

@Component({
  selector: 'wycieczki',
  templateUrl: './wycieczki.component.html',
  styleUrls: ['./wycieczki.component.css']
})
export class WycieczkiComponent implements OnInit {
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
