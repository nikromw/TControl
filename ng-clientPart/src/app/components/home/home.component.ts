import { Component, NgModule, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookstoreService } from 'src/app/services/bookstore.service';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CreateNoticeComponent } from '../create-notice/create-notice.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
books: Book[]=[];
columns =['id','author', 'title', 'price']
closeResult = '';
title: string;
body: string
  constructor(private bs: BookstoreService ,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.bs.getCatalog()
    .subscribe(res =>{
      this.books = res
    })
  }

  createNoticeDialog(): void {
    const dialogRef = this.dialog.open(CreateNoticeComponent, {
      width: '250px',
      data: {title : this.title , body: this.body }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.title = result;
      this.body = result;
    });
  }

}
