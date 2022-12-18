import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { AUTH_API_URL, STORE_API_URL } from './app-injection-tokens';
import { environment } from 'src/environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { ACCESS_TOKEN_KEY } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LittleNoticeComponent } from './components/little-notice/little-notice.component';
import { BaseMenuComponent } from './components/base-menu/base-menu.component';
import { AuthComponent } from './components/auth/auth.component';
import { CreateNoticeComponent } from './components/create-notice/create-notice.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { ProfileComponent } from './components/profile/profile.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { ResumeComponent } from './components/resume/resume.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProfileModalComponent } from './components/profile-modal/profile-modal.component';
import { EditNoteComponent } from './components/little-notice/edit-note/edit-note.component';
import { MatSnackBar} from '@angular/material/snack-bar'; 
import { ProfileService } from './services/profile.service';

export function tokenGetter(){
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LittleNoticeComponent,
    BaseMenuComponent,
    AuthComponent,
    CreateNoticeComponent,
    ProfileComponent,
    LeftMenuComponent,
    ResumeComponent,
    RegistrationComponent,
    ProfileModalComponent,
    EditNoteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatInputModule, 
    JwtModule.forRoot({
      config:{
        tokenGetter, 
        allowedDomains: environment.tokenWhiteListedDomains
      }
    })
  ],
  exports: [HomeComponent],
  providers: [
    MatDialog,
    ProfileService,
    MatSnackBar,
    Overlay,{
    provide: AUTH_API_URL,
    useValue: environment.authApi
  },
  {
    provide: STORE_API_URL,
    useValue: environment.storeApi
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
