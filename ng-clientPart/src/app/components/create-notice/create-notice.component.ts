import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'create-notice',
  templateUrl: './create-notice.component.html',
  styleUrls: ['./create-notice.component.scss']
})
export class CreateNoticeComponent implements OnInit {

title: string;
body: string;
description: string;
animal: string;
name: string;
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<CreateNoticeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close([this.title, this.body]);
  }

}

export interface DialogData {
  title: string;
  body: string;
}

