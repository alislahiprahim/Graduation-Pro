import { Component, OnInit, Inject } from '@angular/core';
import { patientService } from '../services/patient.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash'
import { DialogData } from '../dprofile/dprofile.component';

@Component({
  selector: 'app-fill-diagnosis',
  templateUrl: './fill-diagnosis.component.html',
  styleUrls: ['./fill-diagnosis.component.css']
})
export class FillDiagnosisComponent implements OnInit {

  diagnosis_form = []
  checked = false
  text: any
  constructor(private mypatientService: patientService, private Fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    console.log(this.data)
  }



  fillDiagnosis(qest) {
    if (_.includes(this.diagnosis_form, qest)) {
    } else {

      this.diagnosis_form.push(qest)
      console.log(this.diagnosis_form)

    }

  }

  addDiagnosis(event) {
    
    let val = event.target.value
    this.diagnosis_form.push(val)
    console.log(this.diagnosis_form)
  }

  sendForm() {

    const { DId } = this.data
    const { diagnosis_form } = this
    this.mypatientService.fillDiagnosisForm({ diagnosis_form, DId }).subscribe((resp: any) => {

      console.log(resp)
    })

  }


}
