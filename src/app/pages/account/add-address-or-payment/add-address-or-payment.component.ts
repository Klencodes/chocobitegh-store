import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-address-or-payment',
  templateUrl: './add-address-or-payment.component.html',
  styleUrls: ['./add-address-or-payment.component.scss']
})
export class AddAddressOrPaymentComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddAddressOrPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }

  ngOnInit(): void {
  }

}
