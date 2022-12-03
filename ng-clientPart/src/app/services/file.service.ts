import { Injectable } from '@angular/core';
import { Observable, subscribeOn, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }



  convertToBase64(file: File): Observable<any> {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber)

    })
   return observable;
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      subscriber.next(fileReader.result);
      subscriber.complete();
    }

    fileReader.onerror = () => {
      subscriber.error();
      subscriber.complete();
    }
  }
}
