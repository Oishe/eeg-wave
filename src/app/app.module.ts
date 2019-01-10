import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';

import { MaterialModule } from './material.module';
import { CoreModule } from './core/core.module';
// import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TimeSeriesComponent } from './time-series/time-series.component';
import { ChartService } from './shared/chart.service';
import { RecorderComponent } from './recorder/recorder.component';
import { TimerComponent } from './timer/timer.component';
import { TimerService } from './timer/timer.service';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    TimeSeriesComponent,
    RecorderComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule, // AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule
  ],
  providers: [ChartService, TimerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
