import { Order } from './../../shared/order';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})

export class OrderListComponent implements OnInit {
  OrderData: any = [];
  dataSource: MatTableDataSource<Order>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['_id', 'service_number', 'segment_group', 'product_name', 'order_status', 'action'];

  constructor(private orderApi: ApiService) { }

  ngOnInit() {
    this.orderApi.GetOrders().subscribe(data => {
      this.OrderData = data;
      this.dataSource = new MatTableDataSource<Order>(this.OrderData);
      this.dataSource.sort = this.sort;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })
  }

  deleteOrder(index: number, e) {
    if (window.confirm('Are you sure?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.orderApi.DeleteOrder(e._id).subscribe()
    }
  }

}