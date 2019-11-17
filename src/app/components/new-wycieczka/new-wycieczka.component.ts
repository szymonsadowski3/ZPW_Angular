import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'new-wycieczka-component',
  styleUrls: ['./new-wycieczka.component.css'],
  template: `
    <h3>Dodaj nową wycieczkę</h3>

    <form [formGroup]="modelForm" (ngSubmit)="onSubmit(modelForm)">
      <div class="form-group">
        <label>nazwa:</label><input name="nazwa" formControlName="nazwa" class="form-control">
        <label>docelowyKrajWycieczki:</label><input name="docelowyKrajWycieczki" formControlName="docelowyKrajWycieczki" class="form-control">
        <label>dataRozpoczecia:</label><input name="dataRozpoczecia" formControlName="dataRozpoczecia" class="form-control">
        <label>dataZakonczenia:</label><input name="dataZakonczenia" formControlName="dataZakonczenia" class="form-control">
        <label>cenaJednostkowa:</label><input name="cenaJednostkowa" formControlName="cenaJednostkowa" class="form-control">
        <label>maxIloscMiejsc:</label><input name="maxIloscMiejsc" formControlName="maxIloscMiejsc" class="form-control">
        <label>opis:</label><input name="opis" formControlName="opis" class="form-control">
        <label>linkDoZdj:</label><input name="linkDoZdj" formControlName="linkDoZdj" class="form-control">
        <label>ileZarezerwowano:</label><input name="ileZarezerwowano" formControlName="ileZarezerwowano" class="form-control">
        <label>oceny:</label><input name="oceny" formControlName="oceny" class="form-control">
      </div>

      <button type="submit">Send</button>
    </form>
  `,
})
export class NewWycieczkaComponent implements OnInit {
  modelForm: FormGroup;

  ngOnInit(): void {
    this.modelForm = new FormGroup({
      nazwa: new FormControl(),
      docelowyKrajWycieczki: new FormControl(),
      dataRozpoczecia: new FormControl(),
      dataZakonczenia: new FormControl(),
      cenaJednostkowa: new FormControl(),
      maxIloscMiejsc: new FormControl(),
      opis: new FormControl(),
      linkDoZdj: new FormControl(),
      ileZarezerwowano: new FormControl(),
      oceny: new FormControl(),
    });
  }

  onSubmit(form): void {
    console.log(form.value);
  }
}
