import { Component, OnDestroy, OnInit } from '@angular/core';
// import * as moment from 'moment';
import * as moment from 'moment-timezone';
import { TIMEZONE } from './core/constants/timezone.constants';
import {
  bounceInOnEnterAnimation,
  bounceOutOnLeaveAnimation,
  fadeInOnEnterAnimation, fadeOutOnLeaveAnimation
} from 'angular-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    bounceInOnEnterAnimation(),
    bounceOutOnLeaveAnimation(),
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-moment-timezone-poc';
  timezone = TIMEZONE;
  selectedTimeZone;
  timeZoneUtcDateTime;
  localTimeZoneDateTime;
  selectedTimeZoneDateTime;
  dateTimeInterval;

  constructor() { }

  ngOnInit(): void {
    this.selectedTimeZone = this.timezone[0];
    this.setTimeInterval();
    console.log(this.timezone)
  }

  onSelectTimeZone(event: any) {
    this.selectedTimeZone = null
    setTimeout(() => {
      this.selectedTimeZone = event;
      this.setTimeInterval();
    });
  }

  setTimeInterval() {
    this.dateTimeInterval = setInterval(() => {
      const localTimeUtc = (moment.utc().format('YYYY-MM-DD HH:mm:ss A'));
      this.timeZoneUtcDateTime = (moment.utc().format('DD-MM-YYYY HH:mm:ss A'));
      const localTime = moment.utc(localTimeUtc).toDate();
      this.localTimeZoneDateTime = moment(localTime).format('DD-MM-YYYY HH:mm:ss A');
      this.selectedTimeZoneDateTime = (moment.tz(this.selectedTimeZone?.utc[0]).format('DD-MM-YYYY HH:mm:ss A'));
    });
  }

  ngOnDestroy() {
    if (this.dateTimeInterval) {
      clearInterval(this.dateTimeInterval);
    }
  }
}
