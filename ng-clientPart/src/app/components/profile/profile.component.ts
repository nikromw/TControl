import { Component, OnInit, Input } from '@angular/core';
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
  }

  logOut(){
    this.as.logout();
  }

}