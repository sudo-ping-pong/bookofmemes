import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  name: string;
  email: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {

    this.userService.statusChange.subscribe(userData => {
      if (userData) {
        this.name = userData.name;
      } else {
        this.name = null;
      }
    });
    firebase.auth().onAuthStateChanged(userData => {
      if (userData && userData.emailVerified) {
        this.isLoggedIn = true;
        const user = this.userService.getProfile();
        if (user && user.name) {
          this.name = user.name;
        }
        this.router.navigate(["/allposts"]);
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  onLogout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.userService.destroy();
        this.isLoggedIn = false;
      });
  }

  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen ;
  }

}
