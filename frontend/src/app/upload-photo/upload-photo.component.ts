import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/UploadFiles.service';
import { UploadModelModule } from '../upload-model/upload-model.module';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css']
})
export class UploadPhotoComponent implements OnInit {

  constructor(private myUploadService: UploadService) { }

  images: any
  currentUpload: UploadModelModule;

  ngOnInit() {
  }

  selectImage(event) {
    debugger

    const file = event.target.files[0];
    this.images = file;

    this.currentUpload = new UploadModelModule(this.images);
    console.log('1', this.currentUpload)


  }

  onSubmit() {
    debugger
    this.myUploadService.pushUpload(this.currentUpload)

  }
}
