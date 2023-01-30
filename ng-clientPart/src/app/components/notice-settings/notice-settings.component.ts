import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';
import { SettingParam } from 'src/app/models/settingParam';
import { NoteSettingService } from 'src/app/services/setting.service';
import { SettingComponent } from './setting/setting.component';

@Component({
  selector: 'app-notice-settings',
  templateUrl: './notice-settings.component.html',
  styleUrls: ['./notice-settings.component.scss']
})
export class NoticeSettingsComponent implements OnInit {
  @ViewChild('settingConteiner', { read: ViewContainerRef }) settingConteiner: ViewContainerRef;
  @ViewChild('settingParamConteiner', { read: ViewContainerRef }) settingParamConteiner: ViewContainerRef;
  settingName: string;
  settings: any;
  settinParams: SettingParam[];
  settingParamName: string;
  selectedSetting: number;

  counter: number;
  constructor(private settingService: NoteSettingService, private _elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.settingService.geSettingtList()
      .subscribe(res => {
        this.settings = res;
        this.loadSettings(res);
      })

      this.settingService.geSettingParamtList()
      .subscribe(res => {
        this.settinParams = res;
      })

  }


  loadSettings(settings: any) {
    this.settingConteiner.clear();
    for (let i = 0; i < settings.length; i++) {
      let component = this.settingConteiner.createComponent(SettingComponent);
      component.setInput("name", settings[i].settingName);
      component.setInput("id", settings[i].id);
    }
  }

  //Load settings params for selected setting
  settingSelectChange(settingId: number){
    this.settingParamConteiner.clear();
    let paramsForCurrentSetting = this.settinParams.filter(x => x.noteSettingId == settingId)
    for (let i = 0; i < paramsForCurrentSetting.length; i++) {
      let component = this.settingParamConteiner.createComponent(SettingComponent);
      component.setInput("name", paramsForCurrentSetting[i].description);
      component.setInput("id", paramsForCurrentSetting[i].id);
    }
  }

  createSetting(name: string) {
    var settingConteiner = document.getElementById('settingConteiner');
    settingConteiner!.innerHTML += `<div>${name}</div>`;
    this.settingService.createSetting(name);
  }

  createSettingParam(value: string) {
    var paramConteiner = document.getElementById('settingParamConteiner');
    paramConteiner!.innerHTML += `<div>${value}<div>`;

    if (this.selectedSetting)
      this.settingService.createSettingParam(value, this.selectedSetting);
  }

  addSettingParam() { }

  @Output()
  public clickOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (targetElement.className == 'setting') {
      this.selectedSetting = parseInt(targetElement.id);
      this.settingSelectChange(parseInt(targetElement.id));
    }
  }

}
