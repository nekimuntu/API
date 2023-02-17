import { Component, OnInit } from '@angular/core';
 ///////SECTION 8 injecting services when Angular load
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Skinet';
  ///////SECTION 8 injecting services when Angular load
  products : any[] = [];
  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/products?PageSize=3&pageindex=6').subscribe({
      next: (response:any) => this.products = response.data,
      error: error => console.log(error),
      complete: () =>{
        console.log('request completed');
        console.log('Extra statement');
      }
    })
  }  
}
