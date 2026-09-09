import { Component } from '@angular/core';
interface ProjectRow {
  id: number;
  name: string;
  owner: string;
  status: 'Healthy' | 'Warning' | 'Offline';
  updated: string;
  description: string;
  services: string[];
}
@Component({
  selector: 'app-table-expand',
  imports: [],
  templateUrl: './table-expand.html',
  styleUrl: './table-expand.scss',
})
export class TableExpand {
  readonly rows: ProjectRow[] = [
    {
      id: 1,
      name: 'Checkout API',
      owner: 'Payments team',
      status: 'Healthy',
      updated: '2 min ago',
      description: 'Processes customer checkout requests across the web storefront.',
      services: ['Orders', 'Payments', 'Inventory'],
    },
    {
      id: 2,
      name: 'User Portal',
      owner: 'Experience team',
      status: 'Warning',
      updated: '8 min ago',
      description: 'Customer account area with a small increase in response time.',
      services: ['Profile', 'Notifications', 'Support'],
    },
    {
      id: 3,
      name: 'Data Pipeline',
      owner: 'Platform team',
      status: 'Offline',
      updated: '24 min ago',
      description: 'Scheduled data processing is paused while maintenance is in progress.',
      services: ['Importer', 'Transform', 'Warehouse'],
    },
  ];

  expandedRowId: number | null = null;

  toggleRow(rowId: number): void {
    this.expandedRowId = this.expandedRowId === rowId ? null : rowId;
  }

  isExpanded(rowId: number): boolean {
    return this.expandedRowId === rowId;
  }

}
