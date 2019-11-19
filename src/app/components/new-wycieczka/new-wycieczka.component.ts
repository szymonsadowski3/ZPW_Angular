import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Wycieczka} from '../../models/wycieczka.model';
import {WycieczkiSerwisService} from '../../services/wycieczki-serwis.service';

@Component({
  selector: 'new-wycieczka-component',
  styleUrls: ['./new-wycieczka.component.css'],
  template: `
    <div class="nowa-wycieczka">
      <h3>Dodaj nową wycieczkę</h3>

      <form [formGroup]="modelForm" (ngSubmit)="onSubmit(modelForm)">
        <div class="form-group">
          <label>nazwa:</label><input name="nazwa" formControlName="nazwa" class="form-control">
          <label>docelowyKrajWycieczki:</label><input name="docelowyKrajWycieczki" formControlName="docelowyKrajWycieczki"
                                                      class="form-control">
          <label>dataRozpoczecia:</label><input name="dataRozpoczecia" formControlName="dataRozpoczecia" class="form-control">
          <label>dataZakonczenia:</label><input name="dataZakonczenia" formControlName="dataZakonczenia" class="form-control">
          <label>cenaJednostkowa:</label><input name="cenaJednostkowa" formControlName="cenaJednostkowa" class="form-control">
          <label>maxIloscMiejsc:</label><input name="maxIloscMiejsc" formControlName="maxIloscMiejsc" class="form-control">
          <label>opis:</label><input name="opis" formControlName="opis" class="form-control">
          <label>linkDoZdj:</label><input name="linkDoZdj" formControlName="linkDoZdj" class="form-control">
          <!--<label>ileZarezerwowano:</label><input name="ileZarezerwowano" formControlName="ileZarezerwowano" class="form-control">-->
          <!--<label>oceny:</label><input name="oceny" formControlName="oceny" class="form-control">-->
        </div>

        <button class="btn btn-primary" type="submit" tooltip="Wycieczka dodana!" placement="top" trigger="click">Send</button>
      </form>
    </div>
  `,
})
export class NewWycieczkaComponent implements OnInit {
  modelForm: FormGroup;
  wycieczkiService: WycieczkiSerwisService;

  constructor(wycieczkiService: WycieczkiSerwisService) {
    this.wycieczkiService = wycieczkiService;
  }

  ngOnInit(): void {
    this.modelForm = new FormGroup({
      nazwa: new FormControl('Dwutygodniowa wycieczka do Ukrainy'),
      docelowyKrajWycieczki: new FormControl('Ukraina'),
      dataRozpoczecia: new FormControl('2020-01-01'),
      dataZakonczenia: new FormControl('2020-01-14'),
      cenaJednostkowa: new FormControl(1000),
      maxIloscMiejsc: new FormControl(5),
      opis: new FormControl('Lorem Ipsum'),
      linkDoZdj: new FormControl('https://via.placeholder.com/100/09f/fff.png'),
    });
  }

  onSubmit(form): void {
    const newWycieczka = {
      ...form.value,
      ileZarezerwowano: 0,
      oceny: [],
    };

    this.wycieczkiService.addProduct(Object.assign(new Wycieczka(), newWycieczka));
  }
}
