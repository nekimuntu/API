import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Brand } from '../shared/models/brand';
import { Product } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';
import { Type } from '../shared/models/type';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
//SECTION9 add the implements
export class ShopComponent implements OnInit{
  @ViewChild('search') searchTerm?: ElementRef
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  shopParams = new ShopParams();

  sortOptions= [
    {name:'Alphabetical',value:'name'},
    {name:'Price: Low to high',value:'priceAsc'},
    {name:'Price High to low',value:'priceDesc'},
  ];

  totalCount = 0;
  constructor(private shopService: ShopService){}

  ngOnInit(): void {   
    this.getProducts();
    this.getBrands();
    this.getTypes();
    
  }


  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe({
      next: response=> {
        this.products = response.data,
        this.shopParams.pageNumber = response.pageIndex,
        this.shopParams.pageSize = response.pageSize,
        this.totalCount = response.count
      },
      error: error=> console.log(error)      
    })
  }
  getBrands(){
    this.shopService.getBrands().subscribe({
      next: response=> this.brands = [{id:0, name:'all'}, ...response],
      //this will create a new object of id 0, and the spread operator with all brands
      error: error=> console.log(error)      
    })
  }

  getTypes(){
    this.shopService.getTypes().subscribe({
      next: response=> this.types = [{id:0, name:'all'}, ...response],
      error: error=> console.log(error)      
    })
  }

  onBrandSelected(brandId: number){
    this.shopParams.brandId=brandId;
    this.shopParams.pageNumber =1;
    this.getProducts()
  }

  onTypeSelected(typeId: number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber =1;
    this.getProducts();
  }

  onSortSelected(event: any){
    this.shopParams.sort=event.target.value;
    this.shopParams.pageNumber =1;
    this.getProducts();
  }

  onPageChanged(event: any){
    /////////Used before making the pager a shared component\\\\\\\\\\\\\\
    // if(this.shopParams.pageNumber !== event.page){
    //   this.shopParams.pageNumber = event.page
    //   this.getProducts();
    // } 
    if(this.shopParams.pageNumber !== event){
      this.shopParams.pageNumber = event
      this.getProducts();
    }
  }

  onSearch(){
    this.shopParams.search = this.searchTerm?.nativeElement.value;
    this.shopParams.pageNumber =1;
    this.getProducts();
  }

  onReset(){
    
    if(this.searchTerm) this.searchTerm.nativeElement.value="";
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
