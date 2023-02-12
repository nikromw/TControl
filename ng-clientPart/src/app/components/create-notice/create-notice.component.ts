import { Component, ElementRef, EventEmitter, HostListener, Inject, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, subscribeOn, Subscriber } from 'rxjs';
import { Note } from 'src/app/models/note';
import { SettingParam } from 'src/app/models/settingParam';
import { FileService } from 'src/app/services/file.service';
import { NoteService } from 'src/app/services/note.service';
import { NoteSettingService } from 'src/app/services/setting.service';
import { SettingService } from 'src/app/src/app/services/setting-service.service';
import { SettingComponent } from '../notice-settings/setting/setting.component';

@Component({
  selector: 'create-notice',
  templateUrl: './create-notice.component.html',
  styleUrls: ['./create-notice.component.scss']
})
export class CreateNoticeComponent implements OnInit {
  
  @ViewChild('settingConteiner', { read: ViewContainerRef }) settingConteiner: ViewContainerRef;
  @ViewChild('settingParamConteiner', { read: ViewContainerRef }) settingParamConteiner: ViewContainerRef;

  title: string;
  body: string;
  note: Note;
  settingsValues: SettingParam[];
  backgroundImg: string;
  settings: SettingParam[];
  settinParams: SettingParam[];
  selectedSetting: number;
param: any;
  constructor(public dialog: MatDialog,
    private settingService: NoteSettingService,
    public dialogRef: MatDialogRef<CreateNoticeComponent>,
    public noteService: NoteService,
    public fileService: FileService,
    private _elementRef: ElementRef,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.note = new Note;
  }
  ngOnInit(): void {    
    this.settingService.geSettingtList()
    .subscribe(res => {
      this.settings = res;
      this.loadSettings(res);
    })

    this.loadSettingsParams();

  }

  settingParamFilter(param: SettingParam){
    if(param.noteSettingId == this.selectedSetting)
      return true;

      return false;
  }


  createNote() {
    this.note.title = this.data.title;
    this.note.body = this.data.body;
    this.note.filePath = this.data.filePath;
    this.note.id = this.data.id;
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

  loadSettings(settings: any) {
    this.settingConteiner.clear();
    for (let i = 0; i < settings.length; i++) {
      let component = this.settingConteiner.createComponent(SettingComponent);
      component.setInput("name", settings[i].settingName);
      component.setInput("id", settings[i].id);
    }
  }

  loadSettingsParams() {
    this.settingService.geSettingParamById(this.selectedSetting)
    .subscribe(res => {
      this.settinParams = res;
    })
  }

  @Output()
  public clickOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (targetElement.className == 'setting') {
      this.selectedSetting = parseInt(targetElement.id);
      this.loadSettingsParams();
    }
  }

}

export interface DialogData {
  title: string;
  body: string;
  filePath: string;
  id: number;
}

