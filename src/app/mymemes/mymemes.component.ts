import { Component, OnInit, OnDestroy } from "@angular/core";
import * as firebase from "firebase";
import { FireService } from "../shared/fire.service";
import { NotificationService } from "../shared/notification.service";

@Component({
  selector: "app-mymemes",
  templateUrl: "./mymemes.component.html",
  styleUrls: ["./mymemes.component.css"]
})
export class MymemesComponent implements OnInit, OnDestroy {
  postList: any = [];
  personalPostRef: any;

  constructor(
    private fire: FireService,
    private notifier: NotificationService
  ) {}

  ngOnInit() {
    const uid = firebase.auth().currentUser.uid;
    this.personalPostRef = this.fire.getUserPostsRef(uid);
    this.personalPostRef.on("child_added", data => {
      this.postList.push({
        key: data.key,
        data: data.val()
      });
    });
  }

  ngOnDestroy() {
    this.personalPostRef.off()
  }
}
