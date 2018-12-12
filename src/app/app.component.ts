import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'book-of-memes';

  ngOnInit() {
    const config = {
      apiKey: "AIzaSyBTY1uoJo9DR4kpl_r_l_TPziPXxofQZhE",
      authDomain: "book-of-memes2.firebaseapp.com",
      databaseURL: "https://book-of-memes2.firebaseio.com",
      projectId: "book-of-memes2",
      storageBucket: "book-of-memes2.appspot.com",
      messagingSenderId: "498303429746"
    };
    firebase.initializeApp(config);
  }

}



