import {Component} from '@angular/core';
import {KoszykService} from '../../services/koszyk.service';

@Component({
  selector: 'koszyk-component',
  styleUrls: ['./koszyk.component.css'],
  template: `
    <h3>Koszyk</h3>
    
    <div class="koszyk">
      <!--Stwórz nowy komponent, niepowiązany z pozostałymi zawierający informacje o wybranych-->
      <!--wycieczkach, ich ilości oraz sumie całego zamówienia. Zaimplementuj potrzebne elementy-->
      <!--kodu ( komponenty, usługę?) które pozwolą na realizacje powyższego.-->
    </div>

    <div class="container">
      <table id="cart" class="table table-hover table-condensed">
        <thead>
        <tr>
          <th style="width:50%">Product</th>
          <th style="width:10%">Price</th>
          <th style="width:8%">Quantity</th>
          <th style="width:22%" class="text-center">Subtotal</th>
          <th style="width:10%"></th>
        </tr>
        </thead>
        <tbody>
        <tr
          *ngFor="let product of this.products"
        >
          <td 
            data-th="Product"
          >
            <div class="row">
              <div class="col-sm-2 hidden-xs"><img src="http://placehold.it/100x100" alt="..." class="img-responsive"/></div>
              <div class="col-sm-10">
                <h4 class="nomargin">{{product.nazwa}}</h4>
                <p>{{product.opis}}</p>
              </div>
            </div>
          </td>
          <td data-th="Price">{{product.cenaJednostkowa | currency: 'EUR'}}</td>
          <td data-th="Quantity">
            <input type="number" class="form-control text-center" value="1">
          </td>
          <td data-th="Subtotal" class="text-center">1.99</td>
          <td class="actions" data-th="">
            <button class="btn btn-info btn-sm"><i class="fa fa-refresh"></i></button>
            <button class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i></button>
          </td>
        </tr>
        </tbody>
        <tfoot>
        <tr class="visible-xs">
          <td class="text-center"><strong>Total 1.99</strong></td>
        </tr>
        <tr>
          <td><a href="#" class="btn btn-warning"><i class="fa fa-angle-left"></i> Continue Shopping</a></td>
          <td colspan="2" class="hidden-xs"></td>
          <td class="hidden-xs text-center"><strong>Total $1.99</strong></td>
          <td><a href="#" class="btn btn-success btn-block">Checkout <i class="fa fa-angle-right"></i></a></td>
        </tr>
        </tfoot>
      </table>
    </div>
  `,
})
export class KoszykComponent {
  koszykService: KoszykService;
  products;

  constructor(koszykService: KoszykService) {
    this.koszykService = koszykService;
    this.getProducts();
  }

  getProducts() {
    this.products = this.koszykService.getProducts();
  }
}
