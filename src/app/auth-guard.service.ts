import { CanActivate } from '@angular/router';
import * as firebase from 'firebase';


export class AuthGuard implements CanActivate {
  canActivate() {
    if (firebase.auth().currentUser) {
      return true;
    } else {
      return false;
    }
  }
}
