import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  //definitions for FileStorage
  task: AngularFireUploadTask;
  percentage: Observable<number>;

  constructor(
    public storage: AngularFireStorage,
    public db: AngularFirestore
  ) {}

  //how to pull data to confirm the most recent ID currently for files
  startUpload(file: Blob) {
    const path = `test/${new Date().getTime()}_recording.csv`;
    this.task = this.storage.upload(path, file);
    this.percentage = this.task.percentageChanges();
  }

  //import put it in my constructor then to this.name.whatever item
  updateScore(
    user: string,
    time: Date,
    score: Number,
    sessionID: Number,
    gameNumber: Number,
    timeScoreID: Number
  ) {
    this.db
      .collection('Users')
      .doc(user)
      .collection('Sessions')
      .doc(sessionID.toString())
      .collection('Simon')
      .doc(gameNumber.toString())
      .collection('TimeScores')
      .doc(timeScoreID.toString())
      .set({
        TimeScore: {
          time: new Date(time),
          score: score,
        },
      });
  }

  updateDB(
    user: string,
    sessionID: Number,
    startTime: Date,
    aStartTime: Date,
    aStopTime: Date,
    stopTime: Date
  ) {
    this.db
      .collection('Users')
      .doc(user)
      .collection('Sessions')
      .doc(sessionID.toString())
      .set({
        sessionID: sessionID,
        startTime: new Date(startTime),
        activityStartTime: new Date(aStartTime),
        activityStopTime: new Date(aStopTime),
        stopTime: new Date(stopTime),
      });
  }

  updateMusic(user: string, sessionID: Number, songID: Number) {
    this.db
      .collection('Users')
      .doc(user)
      .collection('Sessions')
      .doc(sessionID.toString())
      .collection('Music')
      .doc(songID.toString())
      .set({
        songID: songID,
      });
  }

  // findMostRecentSessionID(user: string) {
  // const  sessions = this.db.collection("Users").doc(user).collection("Sessions");
  // // var recentID = sessions.where("sessionID", ">=", "sessionID");
  // let recentID = sessions.orderBy("sessionID", "desc").limit(1);
  // return (recentID + 1);
  // }
}
