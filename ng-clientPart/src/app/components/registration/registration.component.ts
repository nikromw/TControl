import { Component, OnInit } from '@angular/core';
import { Registration } from 'src/app/models/registration';
import { AuthService } from 'src/app/services/auth.service';
import { FileService } from 'src/app/services/file.service';
import { MatSnackBar} from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  regModel: Registration;

  constructor(private as: AuthService, private fileService: FileService) { }

  ngOnInit(): void {
    this.regModel = new Registration;
  }

  onselectFile($event: Event) {
    const target = $event.target as HTMLInputElement;

    const file: File = (target.files as FileList)[0];
    this.fileService.convertToBase64(file).subscribe((d: string) => {
      this.regModel.photo = d;
    });
  }

  registration(){
      this.as.registration(this.regModel);
  }

}
