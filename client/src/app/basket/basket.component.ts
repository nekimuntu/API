import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { Product } from '../shared/models/product';
import { BasketItem } from '../shared/models/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {

  constructor(public basketService:BasketService){}

  getTotal(quantity:number,price:number){
      return quantity*price
  }
  
  incrementQuantity = (item:BasketItem)=>{
    this.basketService.addItemToBasket(item);
  }

  removeItem(id:number,quantity=1){
    this.basketService.removeItemFromBasket(id,quantity)
  }


}
