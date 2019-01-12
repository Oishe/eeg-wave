import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { CoreModule } from './core/core.module';
// import { AppRoutingModule } from './app-routing.module';

import { ChartService } from './shared/chart.service';
import { TimerService } from './timer/timer.service';
import { RecorderService } from './recorder/recorder.service';
import { DataService } from './shared/data.service';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TimeSeriesComponent } from './time-series/time-series.component';
import { RecorderComponent } from './recorder/recorder.component';
import { TimerComponent } from './timer/timer.component';
import { ButtonsComponent } from './timer/timer.buttons';
import { ActivityComponent } from './activity/activity.component';
import { EmbedGameComponent } from './activity/embed-game/embed-game.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    TimeSeriesComponent,
    RecorderComponent,
    TimerComponent,
    ButtonsComponent,
    ActivityComponent,
    EmbedGameComponent
  ],
  imports: [
    BrowserModule, // AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule,
    FormsModule
  ],
  providers: [ChartService, TimerService, RecorderService, DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
