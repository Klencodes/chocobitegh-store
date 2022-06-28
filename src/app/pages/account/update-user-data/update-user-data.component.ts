import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as e from 'express';
import { ToastrService } from 'ngx-toastr';
import { ResponseStatus } from 'src/app/core/enums/enums';
import { UserService } from 'src/app/core/services/api-calls/user.service';

@Component({
  selector: 'app-update-user-data',
  templateUrl: './update-user-data.component.html',
})
export class UpdateUserDataComponent implements OnInit {
  userDataForm: FormGroup;
  userPasswordForm: FormGroup;
  isProcessing: boolean;
  isEdit: boolean;
  statesData;
  stateCities;
  hideCurrentPassword = true;
  hidePassword = true;
  dialogTitle = "";
  configData: { suppressScrollX: boolean; wheelSpeed: number; };
  constructor(
    private userService: UserService,
    private toast: ToastrService,
    private dialogRef: MatDialogRef<UpdateUserDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.configData = {  suppressScrollX: true, wheelSpeed: 0.3 };

    this.userDataForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
    })
    this.userPasswordForm = new FormGroup({
      old_password: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required]),
    })

    if(this.data.isPassChange){
      this.dialogTitle = "Change Password"
    }else{
      this.dialogTitle = "Update Profile"

    }
  }

  onSubmit(data) {
    if(this.data.isPassChange){
      if (this.userPasswordForm.invalid) {
        this.userPasswordForm.markAllAsTouched()
        this.toast.error('', 'Please enter all required fields')
        return;
      }
      this.isProcessing = true;
      this.userService.changePassword(data, (error, result) => {
        this.isProcessing = false;
        if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
          this.dialogRef.close(true)
        }
      })
    }else{
      if (this.userDataForm.invalid) {
        this.userDataForm.markAllAsTouched()
        this.toast.error('', 'Please enter all required fields')
        return;
      }
      this.isProcessing = true;
      this.userService.updateUserDetails(data, (error, result) => {
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
  get first_name() { return this.userDataForm.get('first_name') }
  get last_name() { return this.userDataForm.get('last_name') }

  get old_password() { return this.userPasswordForm.get('old_password') }
  get password() { return this.userPasswordForm.get('password') }
  get confirm_password() { return this.userPasswordForm.get('confirm_password') }

}