import { Component } from '@angular/core';

@Component({
  selector: 'wycieczki',
  templateUrl: './wycieczki.component.html',
  styleUrls: ['./wycieczki.component.css']
})
export class WycieczkiComponent {
  items = [
    {
      nazwa: "Dwutygodniowa wycieczka do Egiptu",
      docelowyKrajWycieczki: "Egipt",
      dataRozpoczecia: "2019-12-12",
      dataZakonczenia: "2019-12-26",
      cenaJednostkowa: "3000zł",
      maxIloscMiejsc: 10,
      opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque.",
      linkDoZdj: "https://via.placeholder.com/100/09f/fff.png",
      ileZarezerwowano: 0,
    },
    {
      nazwa: "Dwutygodniowa wycieczka do Rosji",
      docelowyKrajWycieczki: "Rosja",
      dataRozpoczecia: "2019-12-12",
      dataZakonczenia: "2019-12-26",
      cenaJednostkowa: "3000zł",
      maxIloscMiejsc: 20,
      opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque.",
      linkDoZdj: "https://via.placeholder.com/100/09f/fff.png",
      ileZarezerwowano: 0,
    },
    {
      nazwa: "Dwutygodniowa wycieczka do USA",
      docelowyKrajWycieczki: "USA",
      dataRozpoczecia: "2019-12-12",
      dataZakonczenia: "2019-12-26",
      cenaJednostkowa: "3000zł",
      maxIloscMiejsc: 30,
      opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque.",
      linkDoZdj: "https://via.placeholder.com/100/09f/fff.png",
      ileZarezerwowano: 0,
    },
    {
      nazwa: "Tygodniowa wycieczka do Egiptu",
      docelowyKrajWycieczki: "Egipt",
      dataRozpoczecia: "2019-12-12",
      dataZakonczenia: "2019-12-19",
      cenaJednostkowa: "3000zł",
      maxIloscMiejsc: 100,
      opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque.",
      linkDoZdj: "https://via.placeholder.com/100/09f/fff.png",
      ileZarezerwowano: 0,
    },
    {
      nazwa: "Tygodniowa wycieczka do Rosji",
      docelowyKrajWycieczki: "Rosja",
      dataRozpoczecia: "2019-12-12",
      dataZakonczenia: "2019-12-19",
      cenaJednostkowa: "3000zł",
      maxIloscMiejsc: 100,
      opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque.",
      linkDoZdj: "https://via.placeholder.com/100/09f/fff.png",
      ileZarezerwowano: 0,
    },
    {
      nazwa: "Tygodniowa wycieczka do USA",
      docelowyKrajWycieczki: "USA",
      dataRozpoczecia: "2019-12-12",
      dataZakonczenia: "2019-12-19",
      cenaJednostkowa: "3000zł",
      maxIloscMiejsc: 100,
      opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque.",
      linkDoZdj: "https://via.placeholder.com/100/09f/fff.png",
      ileZarezerwowano: 0,
    },

    {
      nazwa: "Dwudniowa wycieczka do Austrii",
      docelowyKrajWycieczki: "Austria",
      dataRozpoczecia: "2019-12-12",
      dataZakonczenia: "2019-12-14",
      cenaJednostkowa: "3000zł",
      maxIloscMiejsc: 100,
      opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque.",
      linkDoZdj: "https://via.placeholder.com/100/09f/fff.png",
      ileZarezerwowano: 0,
    },
    {
      nazwa: "Dwudniowa wycieczka do Czech",
      docelowyKrajWycieczki: "Czechy",
      dataRozpoczecia: "2019-12-12",
      dataZakonczenia: "2019-12-14",
      cenaJednostkowa: "3000zł",
      maxIloscMiejsc: 100,
      opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque.",
      linkDoZdj: "https://via.placeholder.com/100/09f/fff.png",
      ileZarezerwowano: 0,
    },
  ];

  onClickPlusButton(item) {
    if(item.ileZarezerwowano < item.maxIloscMiejsc) {
      item.ileZarezerwowano += 1;
      console.log(`Zarezerwowano miejsce na wycieczkę ${item.nazwa}`);
    } else {
      console.log(`Max ilosc miejsc na wycieczkę ${item.nazwa} zostala osiagnieta`);
    }
  }

  onClickMinusButton(item) {
    if(item.ileZarezerwowano > 0) {
      item.ileZarezerwowano -= 1;
      console.log(`Zrezygnowano z miejsca na wycieczkę ${item.nazwa}`);
    } else {
      console.log(`Nie mozna zrezygnowac z wycieczki ${item.nazwa}`);
    }
  }
}
