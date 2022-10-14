import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

declare let $: any;

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    'T' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  services = [
    { id: 1, name: "Lavado" },
    { id: 2, name: "Lavado-Encerado" },
    { id: 3, name: "Cambio Aceite" },
    { id: 4, name: "Revision" },
    { id: 5, name: "Mecanica" }
  ];

  selectedService: String;

  Events = [

    {
      id: '1234',
      title: 'Cita placa 234432',
      start: '2022-10-05'
    }

  ];

  tempEvent: any;

  calendarOptions!: CalendarOptions;

  user: any;

  constructor() {

    

  }


  handleSave() {
    if (this.selectedService) {
      console.log(this.tempEvent)
      console.log(this.selectedService)
      this.tempEvent['idService'] = this.selectedService
      this.Events.push(this.tempEvent);
      $("#myModal").modal("hide");
    }else{
      alert('Debe seleccionar un servicio')
    }
  }


  onDateClick(res: any) {
    if (!res.allDay) {

      let date = formatDate(res.date)

      $("#myModal").modal("show");
      $(".modal-title").text("Choose Service");
      $(".modal-title").text("Add Event at : " + date);

      this.tempEvent = {
        id: String(this.user.email),
        title: this.user.firstName,
        start: date
      }

    }




  }

  ngOnInit() {

    setTimeout(() => {
      this.calendarOptions = {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
        selectable: true,
        //dateClick: this.onDateClick.bind(this),
        eventChange: ()=>{console.log(this.Events)},
        events: this.Events,
        editable: true,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
      };
    }, 3500);

  }

}
