import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss']
})
export class ProfileModalComponent implements OnInit {

  constructor( public router: Router, private as: AuthService,
    public dialogRef: MatDialogRef<ProfileModalComponent>) { }

  ngOnInit(): void {
  }

  goPage(page: string){
    this.router.navigate([page]);
    this.dialogRef.close();
  }

  logout(){
    this.as.logout();
    this.dialogRef.close();
  }

}
