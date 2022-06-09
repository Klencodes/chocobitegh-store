import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './terms-conditions.component.html',
})
export class TermsConditionsComponent implements OnInit {
  configData: { suppressScrollX: boolean; wheelSpeed: number; };

  constructor(
    private dialogRef: MatDialogRef<TermsConditionsComponent>
  ) { }

  ngOnInit(): void {
    this.configData = { suppressScrollX: true, wheelSpeed: 0.3 };
  }

  closeDialog(){
    this.dialogRef.close(true);
  }

}
