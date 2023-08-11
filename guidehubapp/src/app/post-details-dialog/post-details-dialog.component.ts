import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-post-details-dialog',
  templateUrl: './post-details-dialog.component.html',
  styleUrls: ['./post-details-dialog.component.css']
})
export class PostDetailsDialogComponent {

  

  post: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.post = data.post;
  }
  

}
