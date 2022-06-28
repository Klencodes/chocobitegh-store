import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResponseStatus } from 'src/app/core/enums/enums';
import { UserService } from 'src/app/core/services/api-calls/user.service';
import { AddOrEditAddressComponent } from '../add-or-edit-address/add-or-edit-address.component';
import { UpdateUserDataComponent } from '../update-user-data/update-user-data.component';

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
      this.isProcessing = false;
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.userDetails = result.results;
      }
    })
  }

  updateUserData(userData) {
    this.dialog.open(UpdateUserDataComponent, { disableClose: true, data: { userData: userData } })
      .afterClosed().subscribe((isSuccess: boolean) => {
        if (isSuccess) {
          this.fetchUserDetails();
        }
      });
  }

  addAddress() {
    this.dialog.open(AddOrEditAddressComponent, { disableClose: true, data: {} })
      .afterClosed().subscribe((isSuccess: boolean) => {
        if (isSuccess) {
          this.fetchUserDetails();
        }
      });
  }
  /**
   * 
   * @param address 
   */
  selectDeliveryAddress(address) {
    this.userService.updateUserPrimaryAddress({ address_id: address.id, address_state: true }, (error, result) => {
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.fetchUserDetails();
      }
    })
  }
}
