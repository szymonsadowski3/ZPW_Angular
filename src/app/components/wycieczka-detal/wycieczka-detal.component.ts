import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {WycieczkiSerwisService} from "../../services/wycieczki-serwis.service";
import {ActivatedRoute} from "@angular/router";
import {KoszykService} from "../../services/koszyk.service";
import {FirebaseService} from "../../services/firebase.service";
import {AuthService} from "../../services/auth.service";
import {NgxSpinnerService} from "ngx-spinner";

declare var ol: any;

@Component({
  selector: 'wycieczka-detal-component',
  styleUrls: ['./wycieczka-detal.component.css'],
  templateUrl: 'wycieczka-detal.component.html',
})
export class WycieczkaDetalComponent implements OnInit {

  preferreddDate: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false
  };

  didUserReserveTrip = false;
  wycieczkaId = null;

  wycieczka: any;
  ratings = [];
  alreadyRated;

  map;


  @Output() reservationChanged = new EventEmitter<string>();
  @Output() tripRemoved = new EventEmitter<any>();
  @Output() tripAddedToCart = new EventEmitter<any>();

  constructor(
    private wycieczkiService: WycieczkiSerwisService,
    private koszykService: KoszykService,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {
    this.wycieczka = this.getInitialBlankObject();
  }

  checkIfPersonReserveTrip(trip) {
    this.firebaseService.getAllOrders().subscribe((orders) => {
      const filteredOrders = orders.filter((order: any) => {
        const tripsIds = order.products.map(product => product.trip.id);
        return ("whoOrdered" in order) && (order.whoOrdered == this.authService.getUser()) && (tripsIds.includes(this.wycieczkaId));
      });

      this.didUserReserveTrip = filteredOrders.length > 0;
    });
  }

  ngOnInit() {
    const wycieczkaId = this.route.snapshot.paramMap.get('id');
    this.wycieczkaId = wycieczkaId;
    this.spinner.show();
    this.firebaseService.getTrip(wycieczkaId).subscribe(response => {
      console.dir(response);
      this.wycieczka = response;
      this.checkIfPersonReserveTrip(this.wycieczka);
      this.countRatings();
      this.alreadyRated = this.userAlreadyRated();
      this.spinner.hide();
    });

    const markerSource = new ol.source.Vector();

    var markerStyle = new ol.style.Style({
      image: new ol.style.Icon( ({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/64/map-marker-icon.png'
      }))
    });

    var openSeaMapLayer = new ol.layer.Tile({
      source: new ol.source.OSM({
        attributions: [
          'All maps © <a href="http://www.openseamap.org/">OpenSeaMap</a>',
        ],
        opaque: false,
        url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png'
      })
    });

    this.map = new ol.Map({
      target: 'map',
      layers: [
        // new ol.layer.Tile({
        //   source: new ol.source.OSM()
        // }),
        openSeaMapLayer,
        new ol.layer.Vector({
          source: markerSource,
          style: markerStyle,
        }),
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([38.963745, 35.243320]),
        zoom: 6
      })
    });

    function addMarker(lon, lat) {
      console.log('lon:', lon);
      console.log('lat:', lat);

      var iconFeatures = [];

      var iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform([lon, lat], 'EPSG:4326',
          'EPSG:3857')),
        name: 'Null Island',
        population: 4000,
        rainfall: 500
      });

      markerSource.addFeature(iconFeature);
    }

    addMarker(38.963745, 35.243320);
  }

  onClickPlusButton(item) {
    if (item.ileZarezerwowano < item.maxIloscMiejsc) {
      item.ileZarezerwowano += 1;
      console.log(`Zarezerwowano miejsce na wycieczkę ${item.nazwa}`);
    } else {
      console.log(`Max ilosc miejsc na wycieczkę ${item.nazwa} zostala osiagnieta`);
    }

    this.reservationChanged.emit('added');
  }

  onClickMinusButton(item) {
    if (item.ileZarezerwowano > 0) {
      item.ileZarezerwowano -= 1;
      console.log(`Zrezygnowano z miejsca na wycieczkę ${item.nazwa}`);
    } else {
      console.log(`Nie mozna zrezygnowac z wycieczki ${item.nazwa}`);
    }

    this.reservationChanged.emit('removed');
  }

  onTripRemoved(trip) {
    this.tripRemoved.emit(trip);
  }

  onTripAddedToCart(trip) {
    this.tripAddedToCart.emit(trip);
  }

  addRating(newRating) {
    this.firebaseService.addRating(this.wycieczka, newRating);
  }

  userAlreadyRated() {
    try {
      const ratedBy = this.wycieczka.oceny.map(ocena => ocena.ratedBy);
      return ratedBy.includes(this.authService.getUser());
    }
    catch(error) {
      return false;
    }
  }

  countRatings() {
    if(this.wycieczka.oceny) {
      const oceny = this.wycieczka.oceny.map(ocena => ocena.rating);


      this.ratings = ((oceny != undefined) && (oceny.length > 0)) ? Object.entries(oceny.reduce(function (acc, curr) {
        if (typeof acc[curr] == 'undefined') {
          acc[curr] = 1;
        } else {
          acc[curr] += 1;
        }

        return acc;
      }, {})): [];
    } else {
      return [];
    }
  }

  getInitialBlankObject() {
    return {
      id: 1,
      nazwa: "",
      docelowyKrajWycieczki: "",
      dataRozpoczecia: "",
      dataZakonczenia: "",
      cenaJednostkowa: 0,
      maxIloscMiejsc: 0,
      opis: "",
      linkDoZdj: "",
      ileZarezerwowano: 0,
      oceny: [],
    };
  }
}
