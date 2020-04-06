import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { doctorService } from '../services/doctor.service';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-treatment-plan',
  templateUrl: './treatment-plan.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./treatment-plan.component.css']
})


export class TreatmentPlanComponent implements OnInit {


  @Input() patientID: string;

  closeResult: string;
  hoveredDate: NgbDate | null = null;
  from: NgbDate | null;
  to: NgbDate | null;
  PrimaryCost: any
  planDetails: any



  constructor(private MydoctorService: doctorService, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private modalService: NgbModal) {
    this.from = calendar.getToday();
    this.to = calendar.getNext(calendar.getToday(), 'd', 10);

  }
  ngOnInit() {
  }


  sendTP() {

    const { from, to, PrimaryCost, planDetails, patientID } = this
    if (from && to && PrimaryCost && planDetails && patientID) {
      debugger
      this.MydoctorService.sendtreatmentplan({ from, to, PrimaryCost, planDetails, patientID }).subscribe((resp: any) => {
        console.log(resp.message)
      })
    }
    else
    console.log("asssasasasasasas")
  }



  onDateSelection(date: NgbDate) {
    if (!this.from && !this.to) {
      this.from = date;
    } else if (this.from && !this.to && date && date.after(this.from)) {
      this.to = date;
    } else {
      this.to = null;
      this.from = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.from && !this.to && this.hoveredDate && date.after(this.from) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.to && date.after(this.from) && date.before(this.to);
  }

  isRange(date: NgbDate) {
    return date.equals(this.from) || (this.to && date.equals(this.to)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }



  openLg(TP_content) {
    this.modalService.open(TP_content, { size: 'lg' });
  }



}
