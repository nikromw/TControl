import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileModalComponent } from './components/profile-modal/profile-modal.component';
import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title(title: any) {
    return "title app"
  }
  
  public get isLoggedIn():boolean{
    return this.as.isAuthenticated();
  }

  constructor(private as: AuthService, public router: Router,public dialog: MatDialog, public profileService: ProfileService){
    
  }

  openProfileModal(){
    const dialogRef = this.dialog.open(ProfileModalComponent, {});
  }

  login(email: string, password: string)
  {
    this.as.login(email,password)
    .subscribe(res =>{

    },error => {
      alert('Wrong login or password.')
    })
  }

  logout(){
    this.as.logout();
  }
}
