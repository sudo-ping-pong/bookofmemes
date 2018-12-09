import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import _ from 'lodash'
import { FireService } from '../shared/fire.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-allposts',
  templateUrl: './allposts.component.html',
  styleUrls: ['./allposts.component.css']
})
export class AllpostsComponent implements OnInit, OnDestroy {
  allRef: any
  loadMoreRef: any;
  all: any =[]


  constructor(private fire: FireService, private notifier: NotificationService) { }

  ngOnInit() {

    this.allRef = firebase.database().ref('allposts').limitToFirst(3);
    this.allRef.on('child_added', data => {
      this.all.push({
        key: data.key,
        data: data.val()
      });
    });
  }

  onLoadMore() {
    if(this.all.length > 0) {
      const lastLoadedPost = _.last(this.all);
      const lastLoadedPostKey = lastLoadedPost.key;

      this.loadMoreRef = firebase.database().ref('allposts').startAt(null, lastLoadedPostKey).limitToFirst(3+1)

      this.loadMoreRef.on('child_added', data => {
        if(data.key === lastLoadedPostKey) {
          return;

        } else {
          this.all.push({
            key: data.key,
            data: data.val()
          })
        }
      })
    }

  }

  ngOnDestroy() {
    this.allRef.off();
    if(this.loadMoreRef) {
      this.loadMoreRef.off();
    }
  }

  onFavoriteClicked(imageData) {
this.fire.handleFavoriteClicked(imageData)
.then(data => {
this.notifier.display('success', 'Image added to favorites');
})
.catch(err => {
this.notifier.display('error', 'Error adding image to favorites')
})
  }

}
