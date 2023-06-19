import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobService } from '../core/services/job.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {

  public modelMain: any = {};
  phoneNumbers: { id: string, phoneNumber: string, typeId: string, typeName: string }[] = [];
  updateData: any = {};

  constructor(private dialogRef: MatDialogRef<ConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private jobService: JobService) {
      if (data) {
        this.modelMain = data;
        this.updateData = Object.assign({}, this.modelMain);
      }
  }
  
  

  closeConfirmModal() {
    this.dialogRef.close();
  }

  deleteJobClick() : void {
    this.jobService.deleteJob(this.updateData, this.phoneNumbers).subscribe(
      res => {
        // this.snackBar.open('Record inserted successfully', 'Close', {
        //   duration: 3000,
        //   verticalPosition: 'top',
        //   panelClass: ['success-snackbar']
        // });
        this.router.navigate(['/jobs']);
        console.log("Record deleted Successfully...");
      },
      err => {
        console.log(err)
        // this.snackBar.open('Error', 'Close', {
        //   duration: 3000,
        //   verticalPosition: 'top',
        //   panelClass: ['error-snackbar']
        // });
        this.router.navigate(['/jobs']);
        console.log("error deleting Successfully...");
      },
      () => {
      }
    );
  }
}

