import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit  } from '@angular/core';
import { NoteSettingServiceService } from 'src/app/services/setting.service';
import { NoteService } from 'src/app/services/note.service';
import { SettingComponent } from './setting/setting.component';

@Component({
  selector: 'app-notice-settings',
  templateUrl: './notice-settings.component.html',
  styleUrls: ['./notice-settings.component.scss']
})
export class NoticeSettingsComponent implements OnInit {
  @ViewChild('settingConteiner', {read: ViewContainerRef}) settingConteiner: ViewContainerRef;
   settingName: string;
   settings: any;
  constructor(private settingService: NoteSettingServiceService) { }

  ngOnInit(): void {
   
  }

  ngAfterViewInit(){
    this.settingService.getList()
    .subscribe(res => {
      this.settings = res;
      this.loadSettings(res);
    }
    )
  }

  loadSettings(settings: any) {
    this.settingConteiner.clear();
    for (let i = 0; i < settings.length; i++) {
    let component =  this.settingConteiner.createComponent(SettingComponent);
    component.setInput("name" , settings[i].settingName);
      //template = `<div>${settings[i].settingName}</div>`;
    }
  }

  createSetting(name : string) {
    var settingConteiner = document.getElementById('settingConteiner');
    settingConteiner!.innerHTML += `<div>${name}</div>`;
    this.settingService.createSetting(name);
  }

  addSettingParam() {

  }

}
