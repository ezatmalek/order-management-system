import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})

export class AddOrderComponent implements OnInit {
  productName: any;
  segmentGroup: any;
  @ViewChild('chipList', { static: false }) chipList;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  orderForm: FormGroup;
  segmentGroupArray: any = ['Consumer', 'SME'];
  productNameArray: any = ['Streamyx', 'Business Line', 'Home Line'];

  ngOnInit() {
    this.submitOrderForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private orderApi: ApiService
  ) { }

  submitOrderForm() {
    this.orderForm = this.fb.group({
      service_number: ['', [Validators.required]],
      segment_group: ['', [Validators.required]],
      product_name: ['', [Validators.required]],
      order_status: ['Processing'],
      remark: ['', [Validators.required]],
      state: ['', [Validators.required]]
    })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.orderForm.controls[controlName].hasError(errorName);
  }

  submitForm() {
    if (this.orderForm.valid) {
      this.orderApi.AddOrder(this.orderForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/order-list'))
      });
    }
  }

}