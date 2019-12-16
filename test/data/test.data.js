

var testoweWycieczki = [
  { // zeroed
    nazwa: "Dwutygodniowa wycieczka do Belgii",
    docelowyKrajWycieczki: "Belgia",
    dataRozpoczecia: "2019-12-12",
    dataZakonczenia: "2019-12-26",
    cenaJednostkowa: 1000,
    maxIloscMiejsc: 10,
    opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque.",
    linkDoZdj: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    ileZarezerwowano: 0,
    oceny: [],
  },
  { //float price
    nazwa: "Dwutygodniowa wycieczka do Austrii",
    docelowyKrajWycieczki: "Austria",
    dataRozpoczecia: "2019-12-12",
    dataZakonczenia: "2019-12-26",
    cenaJednostkowa: 2000.5,
    maxIloscMiejsc: 15,
    opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque.",
    linkDoZdj: "https://images.unsplash.com/photo-1520503922584-590e8f7a90d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    ileZarezerwowano: 0,
    oceny: [],
  },
  { // full
    nazwa: "Dwutygodniowa wycieczka do Anglii",
    docelowyKrajWycieczki: "Anglia",
    dataRozpoczecia: "2019-12-12",
    dataZakonczenia: "2019-12-26",
    cenaJednostkowa: 3000,
    maxIloscMiejsc: 5,
    opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque.",
    linkDoZdj: "https://images.unsplash.com/photo-1488747279002-c8523379faaa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    ileZarezerwowano: 5,
    oceny: [],
  },
  { // rated
    nazwa: "Tygodniowa wycieczka do Hiszpanii",
    docelowyKrajWycieczki: "Hiszpania",
    dataRozpoczecia: "2019-12-12",
    dataZakonczenia: "2019-12-19",
    cenaJednostkowa: 1100.5,
    maxIloscMiejsc: 7,
    opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque.",
    linkDoZdj: "https://images.unsplash.com/photo-1512753360435-329c4535a9a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    ileZarezerwowano: 0,
    oceny: [{ratedBy: "szymonsadowski3@gmail.com", rating: 5}],
  },
  { // semi-reserved
    nazwa: "Tygodniowa wycieczka do Rosji",
    docelowyKrajWycieczki: "Rosja",
    dataRozpoczecia: "2019-12-12",
    dataZakonczenia: "2019-12-19",
    cenaJednostkowa: 3000,
    maxIloscMiejsc: 9,
    opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque.",
    linkDoZdj: "https://picsum.photos/100/100",
    ileZarezerwowano: 5,
    oceny: [],
  },
  { // multiple rated
    nazwa: "Tygodniowa wycieczka do USA",
    docelowyKrajWycieczki: "USA",
    dataRozpoczecia: "2019-12-12",
    dataZakonczenia: "2019-12-19",
    cenaJednostkowa: 3000,
    maxIloscMiejsc: 4,
    opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque.",
    linkDoZdj: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1375&q=80",
    ileZarezerwowano: 0,
    oceny: [{ratedBy: "szymonsadowski3@gmail.com", rating: 2}, {ratedBy: "szymonsadowski3@gmail.com", rating: 3}],
  },

  {
    nazwa: "Dwudniowa wycieczka do Nigerii",
    docelowyKrajWycieczki: "Nigeria",
    dataRozpoczecia: "2019-12-12",
    dataZakonczenia: "2019-12-14",
    cenaJednostkowa: 3000,
    maxIloscMiejsc: 6,
    opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque.",
    linkDoZdj: "https://images.unsplash.com/photo-1537372023620-37161b1ad8ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
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
    linkDoZdj: "https://images.unsplash.com/photo-1527001825348-e9b873d49c01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    ileZarezerwowano: 0,
    oceny: [],
  },
];
