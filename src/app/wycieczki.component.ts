import {Component} from '@angular/core';

@Component({
  selector: 'wycieczki',
  templateUrl: './wycieczki.component.html',
  styleUrls: ['./wycieczki.component.css']
})
export class WycieczkiComponent {
  items;

  constructor () {
    this.items = [
      {
        nazwa: "Dwutygodniowa wycieczka do Egiptu",
        docelowyKrajWycieczki: "Egipt",
        dataRozpoczecia: "2019-12-12",
        dataZakonczenia: "2019-12-26",
        cenaJednostkowa: 1000,
        maxIloscMiejsc: 10,
        opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque.",
        linkDoZdj: "https://via.placeholder.com/100/09f/fff.png",
        ileZarezerwowano: 0,
        oceny: [],
      },
      {
        nazwa: "Dwutygodniowa wycieczka do Rosji",
        docelowyKrajWycieczki: "Rosja",
        dataRozpoczecia: "2019-12-12",
        dataZakonczenia: "2019-12-26",
        cenaJednostkowa: 2000,
        maxIloscMiejsc: 15,
        opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque.",
        linkDoZdj: "https://via.placeholder.com/100/09f/fff.png",
        ileZarezerwowano: 0,
        oceny: [],
      },
      {
        nazwa: "Dwutygodniowa wycieczka do USA",
        docelowyKrajWycieczki: "USA",
        dataRozpoczecia: "2019-12-12",
        dataZakonczenia: "2019-12-26",
        cenaJednostkowa: 3000,
        maxIloscMiejsc: 5,
        opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque.",
        linkDoZdj: "https://via.placeholder.com/100/09f/fff.png",
        ileZarezerwowano: 0,
        oceny: [],
      },
      {
        nazwa: "Tygodniowa wycieczka do Egiptu",
        docelowyKrajWycieczki: "Egipt",
        dataRozpoczecia: "2019-12-12",
        dataZakonczenia: "2019-12-19",
        cenaJednostkowa: 1100,
        maxIloscMiejsc: 7,
        opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque.",
        linkDoZdj: "https://via.placeholder.com/100/09f/fff.png",
        ileZarezerwowano: 0,
        oceny: [],
      },
      {
        nazwa: "Tygodniowa wycieczka do Rosji",
        docelowyKrajWycieczki: "Rosja",
        dataRozpoczecia: "2019-12-12",
        dataZakonczenia: "2019-12-19",
        cenaJednostkowa: 3000,
        maxIloscMiejsc: 9,
        opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque.",
        linkDoZdj: "https://via.placeholder.com/100/09f/fff.png",
        ileZarezerwowano: 0,
        oceny: [],
      },
      {
        nazwa: "Tygodniowa wycieczka do USA",
        docelowyKrajWycieczki: "USA",
        dataRozpoczecia: "2019-12-12",
        dataZakonczenia: "2019-12-19",
        cenaJednostkowa: 3000,
        maxIloscMiejsc: 4,
        opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque.",
        linkDoZdj: "https://via.placeholder.com/100/09f/fff.png",
        ileZarezerwowano: 0,
        oceny: [],
      },

      {
        nazwa: "Dwudniowa wycieczka do Austrii",
        docelowyKrajWycieczki: "Austria",
        dataRozpoczecia: "2019-12-12",
        dataZakonczenia: "2019-12-14",
        cenaJednostkowa: 3000,
        maxIloscMiejsc: 6,
        opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque.",
        linkDoZdj: "https://via.placeholder.com/100/09f/fff.png",
        ileZarezerwowano: 0,
        oceny: [],
      },
      {
        nazwa: "Dwudniowa wycieczka do Czech",
        docelowyKrajWycieczki: "Czechy",
        dataRozpoczecia: "2019-12-12",
        dataZakonczenia: "2019-12-14",
        cenaJednostkowa: 5000,
        maxIloscMiejsc: 11,
        opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque.",
        linkDoZdj: "https://via.placeholder.com/100/09f/fff.png",
        ileZarezerwowano: 0,
        oceny: [],
      },
    ];
  }

}
