import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ResponseStatus } from 'src/app/core/enums/enums';
import { UserService } from 'src/app/core/services/api-calls/user.service';
import { DataProviderService } from 'src/app/core/services/helpers/data-provider.service';

@Component({
  selector: 'app-add-or-edit-address',
  templateUrl: './add-or-edit-address.component.html'
})
export class AddOrEditAddressComponent implements OnInit {

  userAddressForm: FormGroup;
  isProcessing: boolean;
  isEdit: boolean;
  statesData;
  stateCities;

  constructor(
    private userService: UserService,
    private toast: ToastrService,
    private dialogRef: MatDialogRef<AddOrEditAddressComponent>,
    private dataProvider: DataProviderService,
  ) {
    this.dataProvider.getLocalData('assets/json/gh-states.json').subscribe(result => {
      if (result !== null) {
        this.statesData = result;
      }
    })
  }

  ngOnInit(): void {
    this.userAddressForm = new FormGroup({
      primary: new FormControl(true, [Validators.required]),
      apartment_number: new FormControl(''),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      postal_code: new FormControl('', [Validators.required]),
      country: new FormControl('Ghana', [Validators.required]),
    })

    this.state.valueChanges.subscribe(value => {
      this.statesData.find(x => {
        if (x.name === value) {
          this.stateCities = x.cities;
          this.postal_code.setValue(x.postal_code)
        }
      })
    })
  }

  onSubmit(data) {
    if (this.userAddressForm.invalid) {
      this.userAddressForm.markAllAsTouched()
      this.toast.warning('', 'Please enter all required fields')
      return;
    }
    this.isProcessing = true;
    this.userService.createUserAddress(data, (error, result) => {
      this.isProcessing = false;
      if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
        this.dialogRef.close(true)
      }
    })
  }
 
  closeDialog(){
    this.dialogRef.close(true)
  }
  get address() { return this.userAddressForm.get('address') }
  get apartment_number() { return this.userAddressForm.get('apartment_number') }
  get city() { return this.userAddressForm.get('city') }
  get state() { return this.userAddressForm.get('state') }
  get postal_code() { return this.userAddressForm.get('postal_code') }
  get country() { return this.userAddressForm.get('country') }

}