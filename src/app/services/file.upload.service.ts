import {Injectable} from '@angular/core';
import {Wycieczka} from '../models/wycieczka.model';
import {FirebaseService} from './firebase.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {GALLERY_UPLOAD_URL, IDKEY} from '../const';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  public files: NgxFileDropEntry[] = [];
  public uploadedFilenames = [];

  addFiles(files) {
    this.files = files;
  }

  getFiles(files) {
    return this.files;
  }

  getFilenames() {
    return this.uploadedFilenames;
    return this.files.map((fileObj) => (fileObj.fileEntry as FileSystemFileEntry).file(file => file.name));
  }

  reset() {
    this.files = [];
  }

  uploadFiles() {
    const client = this.http;
    const uploadedFilenames = this.uploadedFilenames;

    for (const droppedFile of this.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          console.dir(file);

          const reader = new FileReader();

          reader.readAsArrayBuffer(file);

          reader.onload = function() {
            client.post(`${GALLERY_UPLOAD_URL}/${file.name}`, file).subscribe(results => {
              console.dir(results);
              uploadedFilenames.push(file.name);
            });
          };

          reader.onerror = function() {
            console.log(reader.error);
          };
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
}
