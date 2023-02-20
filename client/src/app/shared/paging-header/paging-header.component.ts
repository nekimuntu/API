import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-paging-header',
  templateUrl: './paging-header.component.html',
  styleUrls: ['./paging-header.component.scss']
})
export class PagingHeaderComponent {
  //SECTION9 pagination header as a shared component
  //ne ps oublier de rajouter dans import le Input
  @Input() pageNumber? : number;
  @Input() pageSize? : number;
  @Input() totalCount? : number;
}
