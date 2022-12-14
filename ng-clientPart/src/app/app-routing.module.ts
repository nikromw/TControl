import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { NoticeSettingsComponent } from './components/notice-settings/notice-settings.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ResumeComponent } from './components/resume/resume.component';

const routes: Routes = [
  {path: '', component: AuthComponent},
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: ProfileComponent },
  {path: 'resume', component: ResumeComponent },
  {path: 'regist', component: RegistrationComponent },
  {path: 'notice-settins', component: NoticeSettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
