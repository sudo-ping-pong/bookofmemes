import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllpostsComponent } from './allposts/allposts.component';
import { ContestsComponent } from './contests/contests.component';
import { FollowingComponent } from './following/following.component';
import { MymemesComponent } from './mymemes/mymemes.component';
import { AddmemeComponent } from './addmeme/addmeme.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: "allposts", component: AllpostsComponent },
  { path: 'following', component: FollowingComponent, canActivate: [AuthGuard] },
  { path: 'contests', component: ContestsComponent },
  { path: 'mymemes', component: MymemesComponent, canActivate: [AuthGuard] },
  { path: 'addmeme', component: AddmemeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
