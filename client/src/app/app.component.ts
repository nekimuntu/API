import { Component, OnInit } from '@angular/core';
 ///////SECTION 8 injecting services when Angular load
import { HttpClient } from '@angular/common/http';
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Yannick Shop';
  //SECTION 14 get basket available throughout the app
  constructor(private basketService : BasketService){}

  ngOnInit(): void {
    const basketId = localStorage.getItem('basket_id');
    //So now because we call this getBasket when the app load
    //it is available for all the app: You an see it in the network tab of developer tool in Chrome
    //before it would be accessible only if you add something to the basket....but not available when coming back to the landing page
    if (basketId) this.basketService.getBasket(basketId)
  }
  
  ///////SECTION 8 injecting services when Angular load
  // products : Product[] = [];
  // constructor(private http: HttpClient){}

  // ngOnInit(): void {
  //   this.http.get<Pagination<Product[]>>('https://localhost:5001/api/products?PageSize=3&pageindex=6').subscribe({
  //     next: response => this.products = response.data,
  //     error: error => console.log(error),
  //     complete: () =>{
  //       console.log('request completed');
  //       console.log('Extra statement');
  //     }
  //   })
  // }  
}
