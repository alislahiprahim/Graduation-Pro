import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { patientService } from '../services/patient.service';
import { NgbDate, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {


  @ViewChild('stickyMenu', { static: false }) menuElement: ElementRef;

  sticky: boolean = false;
  elementPosition: any;
  showFiller = false;

  user: SocialUser;
  loggedIn: boolean;
  hoveredDate: NgbDate | null = null;
  from_date: NgbDate;
  to_date: NgbDate | null = null;
  imageURL: any = '';
  PloggedIn: any

  constructor(private authService: AuthService, public myMatDialog: MatDialog, private MypatientService: patientService, private myNgbModal: NgbModal, calendar: NgbCalendar) {
    this.from_date = calendar.getToday();
    this.to_date = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngAfterViewInit() {
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }



  ngOnInit() {
    this.authService.authState.subscribe((user: any) => {
      this.user = user;
      this.imageURL = user.photoUrl
      this.loggedIn = (user != null);
    });
    this.MypatientService.getpatientData().subscribe((user) => {
      this.PloggedIn = (user != 'authentication failed')
    })
  }


  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll > this.elementPosition) { this.sticky = true; }
    else { this.sticky = false; }
  }


  patientArrivalDate() {

    const { from_date, to_date } = this
    this.MypatientService.patientArrivalDate({ from_date, to_date }).subscribe((resp: any) => {

    })
  }





  openTemp(showCalender) {
    this.myNgbModal.open(showCalender)
  }
  closeTemp(showCalender) {
    this.myNgbModal.dismissAll(showCalender)
  }

  onDateSelection(date: NgbDate) {
    if (!this.from_date && !this.to_date) {
      this.from_date = date;
    } else if (this.from_date && !this.to_date && date.after(this.from_date)) {
      this.to_date = date;
    } else {
      this.to_date = null;
      this.from_date = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.from_date && !this.to_date && this.hoveredDate && date.after(this.from_date) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.to_date && date.after(this.from_date) && date.before(this.to_date);
  }

  isRange(date: NgbDate) {
    return date.equals(this.from_date) || (this.to_date && date.equals(this.to_date)) || this.isInside(date) || this.isHovered(date);
  }





}
