import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { patientService } from '../services/patient.service';
import { NgbDate, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { doctorService } from '../services/doctor.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;
  hoveredDate: NgbDate | null = null;
  from_date: NgbDate;
  to_date: NgbDate | null = null;
  imageURL: any = '';
  imageURL2: any = '';
  PloggedIn: any

  doctorService
  onMessage = false;
  showNotification: boolean;
  id: any;
  DimageURL: any;

  constructor(private mydoctorservice: doctorService, private authService: AuthService, public myMatDialog: MatDialog, private MypatientService: patientService, private myNgbModal: NgbModal, calendar: NgbCalendar) {
    this.from_date = calendar.getToday();
    this.to_date = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.authService.authState.subscribe((user: any) => {
      this.user = user;
      this.imageURL = user.photoUrl
      this.loggedIn = (user != null);
    });
    this.MypatientService.getUSerProfile().subscribe((user: any) => {
    
      this.PloggedIn = (user != 'authentication failed')
      
      if (user.data.questions) {
        this.DimageURL = user.data.avatar
        this.id = user.data._id
      } else {

        this.imageURL2 = user.data.avatar

      }
    })

  }

  patientArrivalDate() {

    const { from_date, to_date } = this
    this.MypatientService.patientArrivalDate({ from_date, to_date }).subscribe((resp: any) => {

    })
  }


  signOut(): void {
    if (this.loggedIn) {
      this.authService.signOut();
      location.reload()

    }
    this.mydoctorservice.signout().subscribe((resp: any) => {

      location.reload()

    })

  }

  OnMessages() {
    this.onMessage = !this.onMessage
  }

  openNotification(state: boolean) {
    this.showNotification = state;
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