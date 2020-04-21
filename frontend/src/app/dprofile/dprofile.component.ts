import { Component, OnInit, Input } from '@angular/core';
import { doctorService } from '../services/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { patientService } from '../services/patient.service';
import { MatDialog } from '@angular/material';
import { FillDiagnosisComponent } from '../fill-diagnosis/fill-diagnosis.component';

export interface DialogData {
  DId(DId: any);
  questions: []
}

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


  constructor(public dialog: MatDialog, public MydoctorService: doctorService, public MyActivatedRoute: ActivatedRoute, private mypatientService: patientService) { }


  ngOnInit() {
    this.getDoctorProfile()
  }


  openDialog() {
    const { questions, DId } = this
    this.dialog.open(FillDiagnosisComponent, {

      data: { DId, questions }

    });
  }


  getDoctorProfile() {
    let id = this.DId
    this.MydoctorService.getDoctoById({ id }).subscribe((resp: any) => {

      this.DData = resp.data
      this.questions = this.DData.questions

    })
  }



}
