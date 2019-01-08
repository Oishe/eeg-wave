import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  //definitions for FileStorage
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  //storage: AngularFireStorage;

  constructor(public storage: AngularFireStorage) {}

  startUpload(file: Blob) {
    const path = `test/${new Date().getTime()}_recording.csv`;
    this.task = this.storage.upload(path, file);
    this.percentage = this.task.percentageChanges();
    return;
  }

}
