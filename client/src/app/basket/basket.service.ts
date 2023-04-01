import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, BasketItem, BasketTotals } from '../shared/models/basket';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baserUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<Basket | null>(null);
  basketSource$ = this.basketSource.asObservable();
  
  private basketTotalsSource = new BehaviorSubject<BasketTotals | null>(null);
  basketTotalsSource$ = this.basketTotalsSource.asObservable();

  constructor(private http: HttpClient) {
    
   }
   getBasket(id:string){
    return this.http.get<Basket>(this.baserUrl + "basket?id=" + id).subscribe(
      {
        next: (basket)  => {
          this.basketSource.next(basket);
          this.calculateTotals();
        }
      }
    );
   }

   setBasket(basket: Basket){
    return this.http.post<Basket>(this.baserUrl + "basket",basket).subscribe(
      {
        next: basket => {
          this.basketSource.next(basket);
          this.calculateTotals();
        }
      }
    );
   }

   getCurrrentBasketValue(){
    return this.basketSource.value;
   }

   addItemToBasket(item:Product | BasketItem, quantity=1){    
    if (this.isProduct(item)) item = this.mapProductItemToBasketItem(item);    
      const basket = this.getCurrrentBasketValue() ?? this.createBasket();
      // basket.items = this.addOrUpdateItemBasket(basket.items, itemToAdd,quantity);
      basket.items = this.addOrUpdateItemBasket(basket.items,item,quantity)
      if(basket.items.length===0){
        this.deleteBasket(basket)
      }
      this.setBasket(basket);
   }

   removeItemFromBasket(id:number, quantity=1){
    const basket = this.getCurrrentBasketValue();
    if(!basket) return;
    const item = basket.items.find(x=>x.id===id);
    if(item){
      item.quantity -= quantity;
      if(item.quantity === 0 ){
        basket.items = basket.items.filter(x=>x.id !==id)
      }
      if(basket.items.length > 0) this.setBasket(basket);
      else this.deleteBasket(basket);
    }
   }

  private addOrUpdateItemBasket(items: BasketItem[], item: BasketItem, quantity: number):BasketItem[] {
    const itemToAdd = items.find(x=>x.id===item.id);
    if(itemToAdd){   
      itemToAdd.quantity += quantity;
    }else{  
      item.quantity = quantity
      items.push(item);
    }
    return items;
  }

  private createBasket(): Basket{
    const basket = new Basket();
    //here we gonna store on the local storage of the browser
    localStorage.setItem('basket_id',basket.id);
    return basket;
  }

  private deleteBasket(basket:Basket) {
    return this.http.delete(this.baserUrl+ "basket?id="+basket.id).subscribe(
      {
        next:() => {
          this.basketSource.next(null);
          this.basketTotalsSource.next(null);
          localStorage.removeItem('basket_id');
        }
      }
    )
  }

   private mapProductItemToBasketItem(item:Product): BasketItem
   {
      return {
        id:item.id,
        productName:item.name,
        price: item.price,
        quantity: 1,
        pictureUrl: item.pictureUrl,
        brand: item.productBrand,
        type: item.productType
      };
   }
   private isProduct(item: BasketItem | Product): item is Product{
    return (item as Product).productBrand !== undefined
   }

   private calculateTotals(){
    const basket = this.getCurrrentBasketValue();
    if(!basket){
      return
    }
    var shipping = 0;
    var subtotal = basket.items.reduce((a,b)=> (b.price * b.quantity) + a ,0);
    var total = subtotal + shipping;
    this.basketTotalsSource.next({
        shipping,subtotal,total
    });
   }
}
