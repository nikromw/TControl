import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NoteSettingServiceService } from 'src/app/services/note-setting-service.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-notice-settings',
  templateUrl: './notice-settings.component.html',
  styleUrls: ['./notice-settings.component.scss']
})
export class NoticeSettingsComponent implements OnInit {
  @ViewChild('settingConteiner', { read: ViewContainerRef }) settingConteiner: ViewContainerRef;
   settingName: string;
  constructor(private settingService: NoteSettingServiceService) { }

  ngOnInit(): void {
    this.settingService.getList()
      .subscribe(res => {
        this.loadSettings(res);
      }
      )
  }

  loadSettings(settings: string[]) {
    var settingConteiner = document.getElementById('settingConteiner');
    var template = "";
    for (let i = 0; i < settings.length; i++) {
      template = `<div>${settings[i]}</div>`;
    }


    if (settingConteiner) {
      settingConteiner!.innerText = template;
    }
  }

  createSetting(name : string) {
    var settingConteiner = document.getElementById('settingConteiner');
    settingConteiner!.innerHTML += `<div>${name}</div>`;
  }

  addSettingParam() {

  }

}
