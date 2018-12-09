import { Component, OnInit } from "@angular/core";
import { NotificationService } from "../shared/notification.service";
import { FireService } from "../shared/fire.service";

@Component({
  selector: "app-addmeme",
  templateUrl: "./addmeme.component.html",
  styleUrls: ["./addmeme.component.css"]
})
export class AddmemeComponent implements OnInit {
  constructor(
    private notifier: NotificationService,
    private fire: FireService
  ) {}

  ngOnInit() {}

  onFileSelection(event) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.fire
        .uploadFile(file)
        .then(data => {
          this.notifier.display("success", "Meme Successfully Uploaded");
          this.fire.handleImageUpload(data);
        })
        .catch(err => {
          this.notifier.display("error", err.message);
        });
    }
  }
}
