import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from 'xng-breadcrumb/lib/types/breadcrumb';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product?:Product

 constructor(private shopService: ShopService, 
              private activatedRoute:ActivatedRoute, 
              private bcService: BreadcrumbService){   
                //fixing bug where id or previous product name is displayed while loading
                  //needs to have a space in the set 
                this.bcService.set('@productDetails',' ')
               }
      //SECTION 10 display product details
    ngOnInit(): void{
            this.loadProduct();
    }
    loadProduct(){
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        // the plus symbole is to cast it to number 
        if(id) this.shopService.getProduct(+id).subscribe({
            next: product => {
              this.product = product;
              this.bcService.set('@productDetails',product.name)
            },
            error: error => console.log(error)
        })
        
    }
}
