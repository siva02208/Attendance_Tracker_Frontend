import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarEvent, CalendarEventAction, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth, startOfDay } from 'date-fns';
import { AttendenceService } from '../../../services/attendence.service';
import { EventColor } from 'calendar-utils';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-calendar-view',

  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],

  templateUrl: './calendar-view.component.html',
})
export class CalendarViewComponent implements OnInit {
  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  isDataAvailable:boolean = false;
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = true;
  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  studentId!:any;


  handleEvent(action: string, event: CalendarEvent): void {


  }

  setView(view: CalendarView) {
    this.view = view;
  }


  constructor(
    private attendenceService: AttendenceService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.studentId = this.route.snapshot.params['studentId'];

    this.getData();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }

  }

  getData() {
    this.attendenceService.getAll().subscribe((res: any) => {

      res.map((data: any) => {
        const colors: Record<string, EventColor> = {
          red: {
            primary: '#ad2121',
            secondary: '#FAE3E3',
          },
          green: {
            primary: '#008000',
            secondary: '#008000',
          },
        };
        const actions: CalendarEventAction[] = [
          {
            label: '',
            a11yLabel: 'Edit',
            onClick: ({ event }: { event: CalendarEvent }): void => {
              this.handleEvent('Edited', event);
            },
          }
        ];

        const temp: CalendarEvent = {
          start: startOfDay(new Date()),
          title: '',
          color: { ...colors.red },
          actions: actions,
        };

        const inputDate = new Date(data.date);
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const monthsOfYear = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ];

        const year = inputDate.getFullYear();
        const month = monthsOfYear[inputDate.getMonth()];
        const date = inputDate.getDate();
        const dayOfWeek = daysOfWeek[inputDate.getDay()];
        const hours = inputDate.getHours();
        const minutes = inputDate.getMinutes();
        const seconds = inputDate.getSeconds();
        const timezoneOffset = inputDate.getTimezoneOffset();
        const timezoneOffsetHours = Math.floor(Math.abs(timezoneOffset) / 60)
          .toString()
          .padStart(2, '0');
        const timezoneOffsetMinutes = (Math.abs(timezoneOffset) % 60)
          .toString()
          .padStart(2, '0');
        const timezoneOffsetSign = timezoneOffset < 0 ? '+' : '-';

        const outputDateStr = `${dayOfWeek} ${month} ${date} ${year} ${hours}:${minutes}:${seconds} GMT${timezoneOffsetSign}${timezoneOffsetHours}${timezoneOffsetMinutes} (India Standard Time)`;
        console.log(outputDateStr);

        temp['start'] = startOfDay(new Date(outputDateStr));
        temp['title'] = data.presentStatus;
        temp['color'] = data.presentStatus === 'present'? colors.green : colors.red;
        temp['actions'] = actions
        if (data.studentId == this.studentId )
        this.events.push(temp);
      });
      this.isDataAvailable = true;
    });

    console.log(this.events);
  }

  dateConvert(dateval: any) {
    // Set the input date
    const inputDate = new Date(dateval);

    // Define the days of the week and months arrays
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    // Get the day of the week and month from the input date
    const dayOfWeek = daysOfWeek[inputDate.getUTCDay()];
    const month = months[inputDate.getUTCMonth()];

    // Get the year, date, hours, minutes, and seconds from the input date
    const year = inputDate.getUTCFullYear();
    const date = inputDate.getUTCDate();
    const hours = inputDate.getUTCHours();
    const minutes = inputDate.getUTCMinutes();
    const seconds = inputDate.getUTCSeconds();

    // Create the desired date string in the format "Sun Mar 26 2023 00:00:00 GMT+0530 (India Standard Time)"
    const dateString = `${dayOfWeek} ${month} ${
      date < 10 ? '0' : ''
    }${date} ${year} ${hours < 10 ? '0' : ''}${hours}:${
      minutes < 10 ? '0' : ''
    }${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds} GMT+0530 (India Standard Time)`;

    console.log(dateString); // Output: "Sat Mar 25 2023 00:00:00 GMT+0530 (India Standard Time)"
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
