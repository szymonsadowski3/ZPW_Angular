import {Component} from '@angular/core';

@Component({
  selector: 'header-component',
  template: `
    <nav class="navbar navbar-light bg-light">
      
      <a class="navbar-brand" href="#">
        Biuro Podróży SadovSky
        <img src="https://via.placeholder.com/350x30" width="350" height="30" class="ml-3 d-inline-block align-top" alt="">
      </a>
      
      <p class="mt-3"><i class="fas fa-home"></i> Kamienica 608, 34-608 Kamienica</p>
    </nav>
  `,
})
export class HeaderComponent {

}
