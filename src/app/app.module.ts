import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';

import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './shared/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { OnlynumberDirective } from './onlynumber.directive';

@NgModule({
  declarations: [
    AppComponent,
    AddOrderComponent,
    EditOrderComponent,
    OrderListComponent,
    OnlynumberDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
