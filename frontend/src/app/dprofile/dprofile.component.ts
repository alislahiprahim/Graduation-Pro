import { Component, OnInit, Input } from '@angular/core';
import { doctorService } from '../services/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { patientService } from '../services/patient.service';

@Component({
  selector: 'app-dprofile',
  templateUrl: './dprofile.component.html',
  styleUrls: ['./dprofile.component.scss']
})
export class DProfileComponent implements OnInit {


  questions: []
  cosmetics: any
  DId: any = this.MyActivatedRoute.snapshot.paramMap.get('id')
  DData: any = {}
  DoctorQST: any = []
  diagnosis_form = []


  constructor(public MydoctorService: doctorService, public MyActivatedRoute: ActivatedRoute, private mypatientService: patientService) { }


  ngOnInit() {
    this.getDoctorProfile()
  }



  getDoctorProfile() {
    let id = this.DId
    this.MydoctorService.getDoctoById({ id }).subscribe((resp: any) => {

      this.DData = resp.data
      this.questions = this.DData.questions

    })
  }

  sendForm() {

    const { DId, diagnosis_form } = this
    this.mypatientService.fillDiagnosisForm({ diagnosis_form, DId }).subscribe((resp: any) => {

      console.log(resp)
    })

  }

  receive_DF(event) {
    this.diagnosis_form = event
  }

}
