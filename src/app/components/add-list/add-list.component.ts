import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent implements OnInit {
  dataName: any;
  fromDialog: any;
  enabledOk: true;
  @ViewChild('name', { static: false }) myValue: ElementRef;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddListComponent>
  ) { }

  ngOnInit(): void {

  }
  onConfirmClick(): void {
    this.dialogRef.close({ event: this.data, data: this.myValue.nativeElement.value });
  }
  onclose(): void {
    this.dialogRef.close();
  }

}
