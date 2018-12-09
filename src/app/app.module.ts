import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { HomeComponent } from "./home/home.component";
import { AllpostsComponent } from "./allposts/allposts.component";
import { FollowingComponent } from "./following/following.component";
import { ContestsComponent } from "./contests/contests.component";
import { MymemesComponent } from "./mymemes/mymemes.component";
import { AddmemeComponent } from "./addmeme/addmeme.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { AuthGuard } from "./auth-guard.service";
import { NotificationComponent } from "./notification/notification.component";
import { NotificationService } from "./shared/notification.service";
import { FireService } from "./shared/fire.service";
import { UserService } from "./shared/user.service";
import { PostComponent } from './shared/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AllpostsComponent,
    FollowingComponent,
    ContestsComponent,
    MymemesComponent,
    AddmemeComponent,
    LoginComponent,
    SignupComponent,
    NotificationComponent,
    PostComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, NgbModule],
  providers: [AuthGuard, NotificationService, FireService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
