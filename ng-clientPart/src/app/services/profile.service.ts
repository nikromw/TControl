import { Injectable } from '@angular/core';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private account: Account;
  constructor() { }

  setAccountParams(account: Account) {
    //~singleton 
    if (!this.account)
      this.account = new Account();

    if (!this.account.id) {
      this.account.id = account.id;
    }
    if (!this.account.eMail) {
      this.account.eMail = account.eMail;
    }
    if (!this.account.name) {
      this.account.name = account.name;
    }
    if (!this.account.roles) {
      this.account.roles = account.roles;
    }
    if (!this.account.photo) {
      this.account.photo = account.photo;
    }

    sessionStorage.setItem('currentUser', JSON.stringify(this.account));
  }

  dropAccountParams() {
    this.account = new Account();
  }

  getAccountParams(): Account {
    var jsonAcc = sessionStorage.getItem('currentUser');

    if (jsonAcc)
      return <Account>JSON.parse(jsonAcc);

    return new Account();
  }
}
