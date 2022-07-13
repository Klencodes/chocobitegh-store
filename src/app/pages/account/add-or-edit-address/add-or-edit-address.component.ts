import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  dialogTitle = "Add Delivery Address"
  btnTxt = "Add Address"
  constructor(
    private userService: UserService,
    private toast: ToastrService,
    private dialogRef: MatDialogRef<AddOrEditAddressComponent>,
    private dataProvider: DataProviderService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dataProvider.getLocalData('assets/json/gh-states.json').subscribe(result => {
      if (result !== null) {
        this.statesData = result;
      }
    })
  }

  ngOnInit(): void {
    this.userAddressForm = new FormGroup({
      address_id: new FormControl(''),
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
    if (this.data.isEdit) {
      this.dialogTitle = "Edit Delivery Address";
      this.btnTxt = "Update Address";
      this.address_id.setValue(this.data.dialogData?.id);
      this.address.setValue(this.data.dialogData?.address);
      this.apartment_number.setValue(this.data.dialogData?.apartment_number);
      this.city.setValue(this.data.dialogData?.city);
      this.state.setValue(this.data.dialogData?.state);
      this.postal_code.setValue(this.data.dialogData?.postal_code);
      this.country.setValue(this.data.dialogData?.country);
    }
  }

  onSubmit(data) {
    if (this.userAddressForm.invalid) {
      this.userAddressForm.markAllAsTouched()
      this.toast.error('Please enter all required fields', '')
      return;
    }
    if(this.data.isEdit){
      this.isProcessing = true;
      this.userService.updateUserAddress(data, (error, result) => {
        this.isProcessing = false;
        if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
          this.dialogRef.close(true)
        }
      })
    }else{
      this.isProcessing = true;
      const payload = {primary: data.primary, address: data.address, apartment_number: data.apartment_number, 
        city: data.city, state: data.state, postal_code: data.postal_code, country: data.country}
      this.userService.createUserAddress(payload, (error, result) => {
        this.isProcessing = false;
        if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
          this.dialogRef.close(true)
        }
      })
    }

  }
 
  closeDialog(){
    this.dialogRef.close(true)
  }
  get address_id() { return this.userAddressForm.get('address_id') }
  get address() { return this.userAddressForm.get('address') }
  get apartment_number() { return this.userAddressForm.get('apartment_number') }
  get city() { return this.userAddressForm.get('city') }
  get state() { return this.userAddressForm.get('state') }
  get postal_code() { return this.userAddressForm.get('postal_code') }
  get country() { return this.userAddressForm.get('country') }

}