import { Component, NgModule, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CreateNoticeComponent } from '../create-notice/create-notice.component';
import { MatDialog } from '@angular/material/dialog';
import { NoteService } from 'src/app/services/note.service';
import { Note } from 'src/app/models/note';
import { LittleNoticeComponent } from '../little-notice/little-notice.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('noteConteiner', {read: ViewContainerRef}) noteConteiner: ViewContainerRef;
note: Note = new Note;
notes: Note[]=[];
columns =['id','author', 'title', 'price']
closeResult = '';
title: string;
body: string;
filePath: string;
  constructor(public dialog: MatDialog , public noteService: NoteService) {
   }
  

  ngOnInit(): void {
    this.noteService.getList()
    .subscribe(res =>{
      this.notes = res;
      this.fillNoteConteiner();
    })
  }

  fillNoteConteiner(){

    this.noteConteiner.clear();
    for(let i = 0; i < this.notes.length; i++){
    var note = this.noteConteiner.createComponent(LittleNoticeComponent);
    note.instance.body = this.notes[i].body;
    note.instance.filePath = this.notes[i].filePath;
    note.instance.id = this.notes[i].id;
    note.instance.title = this.notes[i].title;
    }
  }

  createNoticeDialog(): void {
    const dialogRef = this.dialog.open(CreateNoticeComponent, {
      data: {title : this.title , body: this.body , filePath: this.filePath},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.note.title = result[0];
      this.note.body = result[1];
      this.note.filePath = result[2];
      this.noteService.creteNote(this.note);
    });
  }


}
