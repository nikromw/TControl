import { Component, NgModule, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookstoreService } from 'src/app/services/bookstore.service';
import { CreateNoticeComponent } from '../create-notice/create-notice.component';
import { MatDialog } from '@angular/material/dialog';
import { NoteService } from 'src/app/services/note.service';
import { Note } from 'src/app/models/note';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
books: Book[]=[];
note: Note = new Note;
notes: Note[]=[];
columns =['id','author', 'title', 'price']
closeResult = '';
title: string;
body: string;
filePath: string;
  constructor(private bs: BookstoreService ,public dialog: MatDialog , public noteService: NoteService) {
   }
  

  ngOnInit(): void {
    this.noteService.getList()
    .subscribe(res =>{
      this.notes = res
    })
  }

  createNoticeDialog(): void {
    const dialogRef = this.dialog.open(CreateNoticeComponent, {
      width: '400px',
      height: '500px',
      data: {title : this.title , body: this.body , filePath: this.filePath}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.note.title = result[0];
      this.note.body = result[1];
      this.note.filePath = result[2];
      this.noteService.creteNote(this.note);
    });
  }


}
