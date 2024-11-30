import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

class Calendar extends Component {
    render (){
        return (
            <div>
                <FullCalendar plugins={[ dayGridPlugin ]} initialView="dayGridMonth"/>
            </div>
        );
    }
}

export default Calendar;