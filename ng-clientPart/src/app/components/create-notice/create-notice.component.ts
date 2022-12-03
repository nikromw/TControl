import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, subscribeOn, Subscriber } from 'rxjs';
import { Note } from 'src/app/models/note';
import { FileService } from 'src/app/services/file.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'create-notice',
  templateUrl: './create-notice.component.html',
  styleUrls: ['./create-notice.component.scss']
})
export class CreateNoticeComponent implements OnInit {

  image!: any;
  title: string;
  body: string;
  description: string;
  animal: string;
  name: string;
  note: Note;
  backgroundImg: string;
  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateNoticeComponent>,
    public noteService: NoteService,
    public fileService: FileService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) {
    this.note = new Note;
  }
  ngOnInit(): void {
  }

  createNote() {
    this.note.title = this.data.title;
    this.note.body = this.data.body;

    this.noteService.creteNote(this.note);

  }

  onselectFile($event: Event) {
    const target = $event.target as HTMLInputElement;

    const file: File = (target.files as FileList)[0];
    this.fileService.convertToBase64(file).subscribe((d: string) => {
      this.data.filePath = d;
    });


  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface DialogData {
  title: string;
  body: string;
  filePath: string;
}

