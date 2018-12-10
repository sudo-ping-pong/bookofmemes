import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { promise } from "protractor";
import { UserService } from "./user.service";

@Injectable()
export class FireService {
  constructor(private user: UserService) {}

  getUserDataFromDatabase(uid) {
    const ref = firebase.database().ref("users/" + uid);
    return ref.once("value").then(snapshot => snapshot.val());
  }

  generateRandomName() {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  uploadFile(file) {
    const fileName = this.generateRandomName();
 
    return new Promise((resolve, reject) => {
      firebase
        .storage()
        .ref("image/" + fileName)
        .put(file)
        .then(snapshot => {
          return snapshot.ref.getDownloadURL();
        })
        .then(fileUrl => {
          resolve({ fileName, fileUrl });
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  handleImageUpload(data) {
    const user = this.user.getProfile();

    const newPersonalPostKey = firebase
      .database()
      .ref()
      .child('mymemes')
      .push().key;
    const personalPostDetails = {
      fileUrl: data.fileUrl,
      name: data.fileName,
      creationDate: new Date().toString()
    };

    const allPostKey = firebase.database().ref('allposts').push().key;
    const allPostDetails = {
      fileUrl: data.fileUrl,
      name: data.fileName,
      creationDate: new Date().toString(),
      uploadedBy: user
    };

    const imageDetails = {
      fileUrl: data.fileUrl,
      name: data.fileName,
      creationDate: new Date().toString(),
      uploadedBy: user,
      favoriteCount: 0
    };

    const updates = {};
    updates[
      '/mymemes/' + user.uid + "/" + newPersonalPostKey
    ] = personalPostDetails;
    updates['/allposts/' + allPostKey] = allPostDetails;
    updates['/images/' + data.fileName] =imageDetails
    
    return firebase.database().ref().update(updates);
  }

  getUserPostsRef(uid) {
    return firebase.database().ref('mymemes').child(uid);
  }

  handleFavoriteClicked(imageData) {
  const uid = firebase.auth().currentUser.uid;

  const updates = {};

    updates['/images/' + imageData.name +"/oldFavoriteCount"] = imageData.favoriteCount;
    updates['/images/' + imageData.name + "/favoriteCount"] = imageData.favoriteCount + 1;
    updates['/favorites/' + uid +"/" + imageData.name] = imageData

    return firebase.database().ref().update(updates)

  }

  followUser(uploadedByUser) {
    const uid = firebase.auth().currentUser.uid;

    const updates = {};
    updates['/follow/' + uid + "/" + uploadedByUser.uid] = true;

    return firebase.database().ref().update(updates);

  }
}
