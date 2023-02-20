import { Component, OnInit } from '@angular/core';
 ///////SECTION 8 injecting services when Angular load
import { HttpClient } from '@angular/common/http';
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  title = 'Skinet';
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
