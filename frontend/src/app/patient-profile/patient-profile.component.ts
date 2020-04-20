import { Component, OnInit } from '@angular/core';
import { patientService } from '../services/patient.service';
import { UploadService } from '../services/UploadFiles.service';
import { UploadModelModule } from '../upload-model/upload-model.module';


@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  images: any
  currentUpload: UploadModelModule;
  imageURL: any
  PData: any;


  constructor(private mypatientservice: patientService, private myUploadService: UploadService) { }

  ngOnInit() {
    this.getPatientProfile()
  }


  selectImage(event) {

    const file = event.target.files[0];
    this.images = file;

    this.currentUpload = new UploadModelModule(this.images);
    this.currentUpload.user = 'patient'
  }

  onSubmit() {
    this.myUploadService.pushUpload(this.currentUpload)

  }

  getPatientProfile() {
    this.mypatientservice.getUSerProfile().subscribe((resp: any) => {
      console.log(resp.data)
      this.PData = resp.data
      this.imageURL = this.PData.avatar
    })
  }

}
