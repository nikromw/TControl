import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'l-notice',
  templateUrl: './little-notice.component.html',
  styleUrls: ['./little-notice.component.scss']
})
export class LittleNoticeComponent implements OnInit {

  constructor( ) { }

  @Input() title: string ;
  @Input() body : string ;
  
  ngOnInit(): void {
  }

}
