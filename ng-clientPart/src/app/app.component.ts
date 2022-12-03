import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

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

  constructor(private as: AuthService, public router: Router){
    
  }

  goToProfile(){
    this.router.navigate(['profile']);
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
