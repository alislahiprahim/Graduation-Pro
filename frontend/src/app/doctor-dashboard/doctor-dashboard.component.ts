import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { doctorService } from '../services/doctor.service';
import { UploadService } from '../services/UploadFiles.service';
import { UploadModelModule } from '../upload-model/upload-model.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash'
@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',

  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {

  P_dignosis_form: any;
  images: any
  currentUpload: UploadModelModule;
  imageURL: any
  DId: any = this.MyActivatedRoute.snapshot.paramMap.get('id')
  patientData: any
  DData: any = {}
  patient_DF: {}
  doctor_chat: any;
  d_chat: any;
  show_chat = false
  patientForm: any;

  constructor(public MyActivatedRoute: ActivatedRoute, private MydoctorService: doctorService, private myUploadService: UploadService, private modalService: NgbModal) {

  }

  ngOnInit() {
    this.getDoctorProfile()

  }


  getDoctorProfile() {

    let id = this.DId
    this.MydoctorService.getDoctoById({ id }).subscribe((resp: any) => {
      
      this.DData = resp.data
      this.d_chat = this.DData.patient_chat
      this.P_dignosis_form = this.DData.P_diagnosis_form
    })
  }



  selectImage(event) {

    const file = event.target.files[0];
    this.images = file;

    this.currentUpload = new UploadModelModule(this.images);
    this.currentUpload.user = 'Doctors'
  }

  onSubmit() {
    this.myUploadService.pushUpload(this.currentUpload)

  }

  getpatients() {
    this.MydoctorService.showPatient().subscribe((resp: any) => {

      this.patientData = resp.patients


    })
  }

  showPatientForm(PId) {
    
    let PD = _.find(this.P_dignosis_form, (p) => {
      return p._id == PId
    })
    if (PD) {
      this.patientForm = PD.diagnosis_form
    }
  }


  openLg(DF_content) {
    this.modalService.open(DF_content, { size: 'lg' });
  }


  getChat(PId) {
    debugger
    this.d_chat = _.find(this.doctor_chat, (p) => {
      return p._id == PId
    })
  }

  toggle() {
    this.show_chat = !this.show_chat;
  }


}







