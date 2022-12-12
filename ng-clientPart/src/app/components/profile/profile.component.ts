import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() name: string;
  @Input() photo: string;
  @Input() Id: string;
  loaded:boolean;

  constructor(private as: AuthService) { }

  ngOnInit(): void {
    console.log("qwe");
  }

  logOut(){
    this.as.logout();
  }

}
