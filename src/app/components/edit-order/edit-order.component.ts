import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ApiService } from './../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})

export class EditOrderComponent implements OnInit {
  productName: any;
  segmentGroup: any;
  @ViewChild('chipList', { static: false }) chipList;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  orderForm: FormGroup;
  segmentGroupArray: any = ['Consumer', 'SME'];
  productNameArray: any = ['Streamyx', 'Business Line', 'Home Line'];

  ngOnInit() {
    this.updateOrderForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private orderApi: ApiService
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.orderApi.GetOrder(id).subscribe(data => {
      console.log(data.subjects)
      this.orderForm = this.fb.group({
        service_number: [data.service_number, [Validators.required]],
        segment_group: [data.segment_group, [Validators.required]],
        product_name: [data.product_name, [Validators.required]],
        remark: [data.remark],
        state: [data.state],
        order_status: [data.order_status]
      })
    })
  }

  updateOrderForm() {
    this.orderForm = this.fb.group({
      service_number: ['', [Validators.required]],
      segment_group: ['', [Validators.required]],
      product_name: ['', [Validators.required]],
      remark: ['', [Validators.required]],
      state: ['', [Validators.required]],
      order_status: ['Processing']
    })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.orderForm.controls[controlName].hasError(errorName);
  }

  updateForm() {
    console.log(this.orderForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.orderApi.UpdateOrder(id, this.orderForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/order-list'))
      });
    }
  }

}