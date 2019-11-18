import {Component} from '@angular/core';
import {KoszykService} from '../../services/koszyk.service';

@Component({
  selector: 'koszyk-component',
  templateUrl: './koszyk.component.html',
  styleUrls: ['./koszyk.component.css'],
})
export class KoszykComponent {
  koszykService: KoszykService;
  products;

  constructor(koszykService: KoszykService) {
    this.koszykService = koszykService;
    this.getProducts();
    console.dir(this.products);
  }

  getProducts() {
    this.products = this.koszykService.getProducts();
  }

  getTotal() {
    return this.koszykService.getTotal();
  }

  onDeleteProduct(product) {
    this.koszykService.deleteTrip(product.trip);
    this.getProducts();
  }

  countChanged(event, product) {
    product.count = parseInt(event.target.value);
    console.dir(this.products);
  }
}
