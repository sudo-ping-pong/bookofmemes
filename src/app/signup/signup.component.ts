import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private notifier: NotificationService) {

  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

    const fullname = form.value.fullname;
    const email = form.value.email;
    const password = form.value.password;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userData => {
        firebase.auth().currentUser.sendEmailVerification();
        const message = `A Verification email has been sent to ${email}. Kindly Verify And Login.`;
        this.notifier.display('success', message);

        return firebase.database().ref('users/' + userData.user.uid).set({
          email: email,
          uid: userData.user.uid,
          name: fullname

        }).then(() => {
          firebase.auth().signOut();
        });

      })
      .catch(err => {
        this.notifier.display('error', err.message);
      })

  }

}
