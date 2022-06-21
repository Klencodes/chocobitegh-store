import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResponseStatus } from 'src/app/core/enums/enums';
import { UserService } from 'src/app/core/services/api-calls/user.service';
import { AddAddressOrPaymentComponent } from '../add-address-or-payment/add-address-or-payment.component';
import { AddOrEditAddressComponent } from '../add-or-edit-address/add-or-edit-address.component';

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  userDetails;
  isProcessing: boolean;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.fetchUserDetails();
  }
  fetchUserDetails() {
    this.isProcessing = true;
    this.userService.fetchUserDetails((error, result) => {
      console.log(result)
      this.isProcessing = false;
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.userDetails = result.results;
      }
    })
  }

  addAddress() {
    this.dialog.open(AddOrEditAddressComponent, { disableClose: true, data: {} })
      .afterClosed().subscribe((isSuccess: boolean) => {
        if (isSuccess) {
          this.fetchUserDetails();
        }
      });
  }
}
