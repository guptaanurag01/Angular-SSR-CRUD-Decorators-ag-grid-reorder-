import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  GridReadyEvent,
} from 'ag-grid-community';
import { ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule])
@Component({
  selector: 'app-ag-grid',
  standalone: true,
  imports: [CommonModule, AgGridAngular],
  templateUrl: './ag-grid.html',
  styleUrls: ['./ag-grid.scss'],
})
export class AgGrid {


  columnDefs: ColDef[] = [
    {
      headerName: '#',
      field: 'id',
      sortable: true,
    },
    {
      headerName: 'Assigned',
      field: 'uname',
      sortable: true,
      cellRenderer: (params: any) => `
            <div style="display:flex;align-items:center">
              <div style="margin-left:12px">
                <div style="font-weight:600">${params.data.uname}</div>
                <div style="font-size:12px;color:#666">
                  ${params.data.position}
                </div>
              </div>
            </div>
          `,
    },
    {
      headerName: 'Name',
      field: 'name',
      sortable: true,
    },
    {
      headerName: 'Priority',
      field: 'priority',
      sortable: true,
      cellRenderer: (params: any) => {
        const colors: any = {
          low: '#e0f2f1',
          medium: '#e3f2fd',
          high: '#fff3e0',
          critical: '#ffebee',
        };
        return `
              <span style="
                padding:4px 8px;
                border-radius:4px;
                background:${colors[params.value]};
                font-weight:600">
                ${params.value}
              </span>
            `;
      },
    },
    {
      headerName: 'Budget',
      field: 'budget',
      sortable: true,
      valueFormatter: p => `$${p.value}k`,
    },
  ];

  // Row Data (same as yours)
  rowData = [
    {
      id: 1,
      uname: 'Sunil Joshi',
      position: 'Web Designer',
      name: 'Elite Admin',
      budget: 3.9,
      priority: 'low',
    },
    {
      id: 2,
      uname: 'Andrew McDownland',
      position: 'Project Manager',
      name: 'Real Homes Theme',
      budget: 24.5,
      priority: 'medium',
    },
    {
      id: 3,
      uname: 'Christopher Jamil',
      position: 'Project Manager',
      name: 'MedicalPro Theme',
      budget: 12.8,
      priority: 'high',
    },
    {
      id: 4,
      uname: 'Nirav Joshi',
      position: 'Frontend Engineer',
      name: 'Hosting Press HTML',
      budget: 2.4,
      priority: 'critical',
    },
    {
      id: 5,
      uname: 'Sunil Joshi',
      position: 'Web Designer',
      name: 'Elite Admin',
      budget: 3.9,
      priority: 'low',
    },
    {
      id: 6,
      uname: 'Andrew McDownland',
      position: 'Project Manager',
      name: 'Real Homes Theme',
      budget: 24.5,
      priority: 'medium',
    },
    {
      id: 7,
      uname: 'Andrew McDownland',
      position: 'Project Manager',
      name: 'Real Homes Theme',
      budget: 24.5,
      priority: 'medium',
    },
    {
      id: 8,
      uname: 'Christopher Jamil',
      position: 'Project Manager',
      name: 'MedicalPro Theme',
      budget: 12.8,
      priority: 'high',
    },
    {
      id: 9,
      uname: 'Nirav Joshi',
      position: 'Frontend Engineer',
      name: 'Hosting Press HTML',
      budget: 2.4,
      priority: 'critical',
    },
    {
      id: 10,
      uname: 'Sunil Joshi ana',
      position: 'sr Web Designer',
      name: 'Elite Admin thomos',
      budget: 3.9,
      priority: 'very low',
    },
    {
      id: 11,
      uname: 'Andrew McDownland1',
      position: 'Sr Project Manager',
      name: 'Real Homes Theme',
      budget: 99.5,
      priority: 'serious',
    },
  ];

  defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    unSortIcon: true,
    flex: 1,
  };

}
