import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { patientService } from '../services/patient.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash'
@Component({
  selector: 'app-fill-diagnosis',
  templateUrl: './fill-diagnosis.component.html',
  styleUrls: ['./fill-diagnosis.component.css']
})
export class FillDiagnosisComponent implements OnInit {

  @Input() questions: []
  diagnosisForm = []
  @Output() messageToEmit = new EventEmitter<any>();
  checked = false

  constructor(private MypatientService: patientService, private myNgbModal: NgbModal) { }

  ngOnInit() {
  }




  openTemp(DF_Modal) {
    this.myNgbModal.open(DF_Modal)
  }

  closeTemp(DF_Modal) {
    this.myNgbModal.dismissAll(DF_Modal)
  }

  fillDiagnosis(qest) {
    if (_.includes(this.diagnosisForm, qest)) {
    } else {

      this.diagnosisForm.push(qest)
      console.log(this.diagnosisForm)

    }

  }

  submitDF() {
    this.messageToEmit.emit(this.diagnosisForm)
  }

}
