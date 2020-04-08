import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './dsignup/dsignup.component';
import { PsignupComponent } from './psignup/psignup.component';
import { PsigninComponent } from './psignin/psignin.component';
import { HomeComponent } from './home/home.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TreatmentPlanComponent } from './treatment-plan/treatment-plan.component';
import { DProfileComponent } from './dprofile/dprofile.component';
import { DsigninComponent } from './dsignin/dsignin.component';
import { TourismComponent } from './tourism/tourism.component';
import { TourProfileComponent } from './tour-profile/tour-profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import * as firebase from 'firebase';
import { MessagesComponent } from './messages/messages.component';
import { FillDiagnosisComponent } from './fill-diagnosis/fill-diagnosis.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ChatComponent } from './chat/chat.component';
import { FilterPipe } from './pipes/filter.pipe';


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('512326190070-4g011vl6fga3nc334l3cfdtqok2ug93t.apps.googleusercontent.com')
  },

]);

export function provideConfig() {
  return config;
}


firebase.initializeApp(environment.firebaseConfig);


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    PsignupComponent,
    PsigninComponent,
    HomeComponent,
    DoctorDashboardComponent,
    WelcomeComponent,
    TreatmentPlanComponent,
    DProfileComponent,
    DsigninComponent,
    TourismComponent,
    TourProfileComponent,
    UploadPhotoComponent,
    MessagesComponent,
    FillDiagnosisComponent,
    NavbarComponent,
    FooterComponent,
    ChatComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: WelcomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'dProfile/:id', component: DProfileComponent },
      { path: 'DsignUp', component: SignupComponent },
      { path: 'DsignIn', component: DsigninComponent },
      { path: 'PsignUp', component: PsignupComponent },
      { path: 'PsignIn', component: PsigninComponent },
      { path: 'treatmentPlan', component: TreatmentPlanComponent },
      { path: 'dashboard/:id', component: DoctorDashboardComponent },
      { path: 'tourism', component: TourismComponent, },
      { path: 'tourProfile', component: TourProfileComponent, },

      { path: '**', redirectTo: 'home' },

    ]),
    HttpClientModule,
    MatCardModule,
    BrowserAnimationsModule,
    NgbModule,
    MatStepperModule,
    SocialLoginModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatCheckboxModule,
    MatInputModule,
    MatGridListModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,


  ],

  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],

  bootstrap: [AppComponent],
  entryComponents: [TreatmentPlanComponent]
})
export class AppModule { }
