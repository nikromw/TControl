import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'l-notice',
  templateUrl: './little-notice.component.html',
  styleUrls: ['./little-notice.component.scss']
})
export class LittleNoticeComponent implements OnInit {

  constructor( ) { }

  title: string ;
  body : string ;
  
  ngOnInit(): void {
  }

}
