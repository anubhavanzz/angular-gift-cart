import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-introduction-content',
  templateUrl: './introductionContent.component.html',
  styleUrls: ['./introductionContent.component.css']
})
export class IntroductionContentComponent implements OnInit, AfterViewInit {
  user: firebase.User;
  constructor(private afAuth: AngularFireAuth, private spinner: NgxSpinnerService) {
    this.afAuth.authState.subscribe(user => this.user = user);
  }

  ngOnInit() {
    this.spinner.show();
    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 9000);
  }
  ngAfterViewInit(): void {

    //this.spinner.hide();
  }

}
