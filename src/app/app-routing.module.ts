import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { OrderListComponent } from './components/order-list/order-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'order-list' },
  { path: 'add-order', component: AddOrderComponent },
  { path: 'edit-order/:id', component: EditOrderComponent },
  { path: 'order-list', component: OrderListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
