import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  router: Router;

  public get isLoggedIn():boolean{
    return this.as.isAuthenticated();
  }

  constructor(private as: AuthService, router: Router){
    
  }
  ngOnInit(): void {
  }


  login(email: string, password: string)
  {
    this.as.login(email,password)
    .subscribe({
     complete: () => this.goToItems(),
     error: () => alert('Error authorithation.')
    })
  }

  goToItems() {
    this.router.navigate(['/home']);
  }

  logout(){
    this.as.logout();
  }

}
