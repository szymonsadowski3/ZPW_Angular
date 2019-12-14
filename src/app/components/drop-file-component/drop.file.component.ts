import {Component} from '@angular/core';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {HttpClient} from '@angular/common/http';
import {GALLERY_UPLOAD_URL} from '../../const';

@Component({
  selector: 'drop-file',
  templateUrl: './drop.file.component.html',
  styleUrls: ['./drop.file.component.css']
})
export class DropFileComponent {

  constructor(private http: HttpClient) {}


  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    const client = this.http;

    this.files = files;
    for (const droppedFile of files) {

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
            client.post(`${GALLERY_UPLOAD_URL}/${file.name}`, file).subscribe(results => { // TODO: file upload finish
              console.dir(results);
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

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}
