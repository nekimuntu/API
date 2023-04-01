import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { RouterModule } from '@angular/router';

const routes = [
  {path: '',component:BasketComponent} //SECTION 14 basket client
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes) //SECTION 14 basket client
  ],
  exports:[
    RouterModule //SECTION 14 basket client
  ]
})
export class BasketRoutingModule { }
