import { Component, inject, ViewChild } from '@angular/core';
// import { MatTableDataSource, MatTableModule } from ''
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource, MatTableModule,  } from '@angular/material/table';
import { MatSort, MatSortModule, Sort,  } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { Highlight, HighlightAuto } from 'ngx-highlightjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';



const ELEMENT_DATA: Element[] = [
  {
    id: 1,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'Sunil Joshi',
    position: 'Web Designer',
    name: 'Elite Admin',
    budget: 3.9,
    priority: 'low',
  },
  {
    id: 2,
    imagePath: 'assets/images/profile/user-2.jpg',
    uname: 'Andrew McDownland',
    position: 'Project Manager',
    name: 'Real Homes Theme',
    budget: 24.5,
    priority: 'medium',
  },
  {
    id: 3,
    imagePath: 'assets/images/profile/user-3.jpg',
    uname: 'Christopher Jamil',
    position: 'Project Manager',
    name: 'MedicalPro Theme',
    budget: 12.8,
    priority: 'high',
  },
  {
    id: 4,
    imagePath: 'assets/images/profile/user-4.jpg',
    uname: 'Nirav Joshi',
    position: 'Frontend Engineer',
    name: 'Hosting Press HTML',
    budget: 2.4,
    priority: 'critical',
  },
  {
    id: 5,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'Sunil Joshi',
    position: 'Web Designer',
    name: 'Elite Admin',
    budget: 3.9,
    priority: 'low',
  },
  {
    id: 6,
    imagePath: 'assets/images/profile/user-2.jpg',
    uname: 'Zndrew McDownland',
    position: 'Zroject Manager',
    name: 'Zeal Homes Theme',
    budget: 94.5,
    priority: 'medium',
  },
];

@Component({
  selector: 'app-common-table',
  imports: [
     MatTableModule, CommonModule, MatSortModule,MatPaginatorModule ],
  templateUrl: './common-table.html',
  styleUrl: './common-table.scss',      
})
export class CommonTable {
  // 1 [Sortable with Table]
  // codeForSortableTable = SORTABLE_TABLE_HTML_SNIPPET;
  // codeForSortableTableTs = SORTABLE_TABLE_TS_SNIPPET;

  private _liveAnnouncer = inject(LiveAnnouncer);

  constructor() { }
  displayedColumns = ['id','assigned', 'name', 'priority', 'budget'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void { }
}

export interface Element {
  id: number;
  imagePath: string;
  uname: string;
  position: string;
  name: string;
  budget: number;
  priority: string;
}
