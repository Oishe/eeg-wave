import { Component } from '@angular/core';
// import { AngularFirestore } from "@angular/fire/firestore";
// import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthService } from './core/auth.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'eeg-wave';
  // user: String;
  constructor(public auth: AuthService) {
    // this.auth.user.subscribe(val => console.log(val.displayName));
  }
}
