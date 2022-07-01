import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as e from 'express';
import { ToastrService } from 'ngx-toastr';
import { ResponseStatus } from 'src/app/core/enums/enums';
import { UserService } from 'src/app/core/services/api-calls/user.service';
import { LocalAuthService } from 'src/app/core/services/helpers/local-auth.service';
import { MustMatch } from 'src/app/core/validators/must-match';

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
  submitted = false;
  dialogTitle = "";
  configData: { suppressScrollX: boolean; wheelSpeed: number; };

  constructor(
    private userService: UserService,
    private localAuth: LocalAuthService,
    private toast: ToastrService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateUserDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.configData = {  suppressScrollX: true, wheelSpeed: 0.3 };

    this.userDataForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
    })
    this.userPasswordForm = this.formBuilder.group({
      current_password: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(6)],
      confirm_password: ['', Validators.required],
    }, { validator: MustMatch('password', 'confirm_password') });

    if(this.data.userData === null){
      this.dialogTitle = "Change Password"
    }else{
      this.dialogTitle = "Update Profile"
      this.first_name.setValue(this.data.userData.first_name)
      this.last_name.setValue(this.data.userData.last_name)
    }
  }

  onSubmit(data) {
    if(this.data.userData === null){
      if (this.userPasswordForm.invalid) {
        this.userPasswordForm.markAllAsTouched();
        this.submitted = true;
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

  get current_password() { return this.userPasswordForm.get('current_password') }
  get password() { return this.userPasswordForm.get('password') }
  get confirm_password() { return this.userPasswordForm.get('confirm_password') }

}