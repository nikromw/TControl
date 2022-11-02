import { Component, NgModule, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookstoreService } from 'src/app/services/bookstore.service';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
books: Book[]=[];
columns =['id','author', 'title', 'price']

  constructor(private bs: BookstoreService) { }

  ngOnInit(): void {
    this.bs.getCatalog()
    .subscribe(res =>{
      this.books = res
    })
  }

}
