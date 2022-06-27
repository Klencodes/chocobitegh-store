import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ResponseStatus } from 'src/app/core/enums/enums';
import { UserModel } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/api-calls/user.service';
import { LocalAuthService } from 'src/app/core/services/helpers/local-auth.service';
import { AddOrEditAddressComponent } from '../../account/add-or-edit-address/add-or-edit-address.component';

@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
})
export class ChangeAddressComponent implements OnInit {
  user: UserModel;
  addresses: any;
  isProcessing: boolean;
  configData: { suppressScrollX: boolean; wheelSpeed: number; };

  constructor(
    private localAuth: LocalAuthService,
    private dialogRef: MatDialogRef<ChangeAddressComponent>,
    private dialog: MatDialog,
    private userService: UserService,
  ) { this.user = this.localAuth.userObj }

  ngOnInit(): void {
    this.configData = {
      suppressScrollX: true,
      wheelSpeed: 0.3
    };

    this.fetchUserAddresses();
  }
  /**
   * Fetch user addresses
   */
  fetchUserAddresses() {
    this.isProcessing = true;
    this.userService.fetchUserAddresses((error, result) => {
      this.isProcessing = false;
      if (result !== null) {
        this.addresses = result.results;
      }
    })  }
    /**
     * Set delivery address
     * @address params
     */
  selectDeliveryAddress(address) {
    this.userService.updateUserPrimaryAddress({ address_id: address.id, address_state: true }, (error, result) => {
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.closeDialog()
      }
    })
  }
  closeDialog() {
    this.dialogRef.close(true);
  }

  addOrEditAddress() {
      this.dialog.open(AddOrEditAddressComponent, { disableClose: true, data: {} })
        .afterClosed().subscribe((isSuccess: boolean) => {
          if (isSuccess) {
            this.fetchUserAddresses()
          }
        });
    }

}
