import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Parent } from './parent/parent';
import { User } from './user/user';
import { Reorder } from './reorder/reorder';
import { Crud } from './crud/crud';
import { CommonTable } from "./common-table/common-table";
import { AgGrid } from './ag-grid/ag-grid';
import { Ssrs } from './ssrs/ssrs';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet ,Parent, User, Reorder, Crud, CommonTable, AgGrid, Ssrs],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('latestAngular');
  
}
