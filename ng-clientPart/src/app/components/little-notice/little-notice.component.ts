import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Note } from 'src/app/models/note';
import { NoteService } from 'src/app/services/note.service';
import { CreateNoticeComponent } from '../create-notice/create-notice.component';

@Component({
  selector: 'l-notice',
  templateUrl: './little-notice.component.html',
  styleUrls: ['./little-notice.component.scss']
})
export class LittleNoticeComponent implements OnInit {

  constructor( private dialog : MatDialog , public noteService: NoteService ) { }

  @Input() title: string ;
  @Input() body : string ;
  @Input() filePath: string;
  @Input() id: number;
  
  ngOnInit(): void {
  }

  editNoteComponent(): void {
    const dialogRef = this.dialog.open(CreateNoticeComponent, {
      width: '400px',
      height: '500px',
      data: {title : this.title , body: this.body , filePath: this.filePath , id: this.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      let note = new Note;
      note.title = result[0];
      note.body = result[1];
      note.filePath = result[2];
      note.id = result[3]
      this.noteService.updateNote(note);
    });
  }

}
