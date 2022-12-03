import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private as: AuthService ) { }

  ngOnInit(): void {
  }

  registration(email: string, password: string, name: string, secName: string, photo: string){

//this.as.registration();
  }

}
