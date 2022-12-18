import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {


  public get isLoggedIn():boolean{
    return this.as.isAuthenticated();
  }

  constructor(private as: AuthService, public router: Router, public profile: ProfileService){
    
  }
  ngOnInit(): void {
  }


  login(email: string, password: string)
  {
    this.as.login(email,password)
    .subscribe({
     complete: () => this.getAccount(),
     error: () => alert('Error authorithation.')
    })
  }

  goPage(path: string){
this.router.navigate([path]);
  }

  getAccount() {
    this.as.getAccount().subscribe({
      complete: () => alert('qweqwe'),
    });
    this.router.navigate(['home']);
  }

  logout(){
    this.as.logout();
  }

}
