import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ResponseStatus } from 'src/app/core/enums/enums';
import { ProductService } from 'src/app/core/services/api-calls/product.service';

@Component({
  templateUrl: './write-reply-review.component.html'
})
export class WriteOrReplyReviewComponent implements OnInit {
  rateValue: number = 5;

  productReviewIdCtrl: FormControl = new FormControl('');
  reviewForm: FormGroup;
  submit: boolean;
  dialogTitle = 'Write a Review';
  btnTxt = 'Post Review';
  isProcessing: boolean;
  configData: { suppressScrollX: boolean; wheelSpeed: number; };

  constructor(
    private toast: ToastrService,
    private productService: ProductService,
    private dialogRef: MatDialogRef<WriteOrReplyReviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.configData = { suppressScrollX: true, wheelSpeed: 0.3 };

    this.reviewForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(64)]),
      summary: new FormControl('', [Validators.required]),
      rating: new FormControl(''),
      product_id: new FormControl(''),
    });
    if (this.data.isReply) {
      this.dialogTitle = 'Reply Review'
      this.btnTxt = 'Reply'
      this.productReviewIdCtrl.setValue(this.data.reviewData.id);
      // this.feedback.setValue(this.data.reviewData.name);
    } else {
      this.product_id.setValue(this.data.reviewData)
    }
  }

  /**
   * Add new review or reply review dialog
   * @data payload to submit
   */
  onSubmit(data) {
    if (!this.data.isReply) {
      if (this.reviewForm.invalid) {
        this.reviewForm.markAllAsTouched();
        this.toast.error('Please enter all required fields');
        return;
      }
      this.isProcessing = true;
      data.rating = this.rateValue;
      this.productService.createProductReview(data, (error, result) => {
        this.isProcessing = false;
        if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
          this.dialogRef.close(true)
        }
      })
    } else {
      this.isProcessing = true;
      const replyData = { summary: data.summary, review_id: this.data.reviewData };
      this.productService.replyReview(replyData, (error, result) => {
        this.isProcessing = false;
        if (result !== null && result.response === ResponseStatus.SUCCESSFUL) {
          this.dialogRef.close(true)
        }
      })
    }
  }

  closeDialog() {
    this.dialogRef.close(true)
  }

  get title() { return this.reviewForm.get('title') }
  get summary() { return this.reviewForm.get('summary') }
  get rating() { return this.reviewForm.get('rating') }
  get product_id() { return this.reviewForm.get('product_id') }
}
