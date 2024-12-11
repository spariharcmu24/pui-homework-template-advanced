import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './calendar.css';


class Calendar extends Component {
    constructor(props){
        let submittedEntriesKeys = Object.keys(localStorage);
        let submittedEntries = [];
        submittedEntriesKeys.map(key => submittedEntries.push(JSON.parse(localStorage.getItem(key))))
        console.log("here we go YERR");
        console.log(submittedEntries);
        let entryDates = [];
        for (let i = 0; i < submittedEntries.length; i++){  
            let currEntryDay = submittedEntries[i];
            let month = currEntryDay["month"].toString();
            if (month.length === 1){
                month = "0"+month;
            }
            let specificDay = currEntryDay["day"].toString();
            if (specificDay.length === 1){
                specificDay = "0"+specificDay;
            }
            let year = currEntryDay["year"].toString();
            let currDayElem = year+"-"+month+"-"+specificDay;
            entryDates.push(currDayElem);
        }
        // entryDates.push("2024-11-13");
        // entryDates.push("2024-11-01");
        let iconDates = {};
        // console.log(entryDates);
        for (let i = 0; i<entryDates.length; i++){
            iconDates[entryDates[i]] = "💜";
        }
        // console.log("icon dates");
        // console.log(iconDates);
        super(props); 
        this.state = {
            iconDates: iconDates,
        };
    }

    renderDayCell = (info) => {
        let dateStr = info.date.toISOString().split("T")[0];

        if(this.state.iconDates[dateStr]){
            let dayEventDiv = info.el.querySelector('.fc-daygrid-day-events');
            if (dayEventDiv) {
                let iconElem = document.createElement('div');
                iconElem.className = 'heart-icon';
                iconElem.textContent = this.state.iconDates[dateStr];
                dayEventDiv.parentNode.appendChild(iconElem);
            }

        }
    }


    render (){
        return (
            <div>
                <FullCalendar plugins={[ dayGridPlugin ]} initialView="dayGridMonth" dayCellDidMount={this.renderDayCell} eventBorderColor="black"/>
            </div>
        );
    }
}

export default Calendar;