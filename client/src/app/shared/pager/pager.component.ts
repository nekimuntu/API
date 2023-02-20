import { Component,EventEmitter,Input, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent {

   //SECTION9 pagination header as a shared component
  //ne ps oublier de rajouter dans import le Input
  @Input() pageNumber? : number;
  @Input() pageSize? : number;
  @Input() totalCount? : number;
  @Output() pageChanged = new EventEmitter<number>();

  onPageChanged(event:any){
    this.pageChanged.emit(event.page)    
  }
}
