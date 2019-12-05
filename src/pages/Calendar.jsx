import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/react";

import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);
const myEventsList = [
  {
    title: "Teste",
    start: new Date(),
    end: new Date(),
    allDay: true
  }
];

const CalendarPage = props => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Calendário</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>
          <Calendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CalendarPage;
