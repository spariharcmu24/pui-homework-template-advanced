import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './calendar.css';

// This file is called on in index.js where the Homepage component exists
// It's used to display the monthtly calendar shown on the home page
// It uses the Full Calendar library to display calendar
class Calendar extends Component {
    constructor(props){
        let submittedEntriesKeys = Object.keys(localStorage);
        let submittedEntries = [];
        submittedEntriesKeys.map(key => submittedEntries.push(JSON.parse(localStorage.getItem(key))))
        // formats date for specific days that have journal entries and puts dates into an array called entryDates 
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
        let iconDates = {};
        // goes through entry dates array and creates key-value pair of each date with a purple heart icon that's added to iconDates object
        for (let i = 0; i<entryDates.length; i++){
            iconDates[entryDates[i]] = "💜";
        }
        super(props); 
        this.state = {
            iconDates: iconDates,
        };
    }

    // function helps to render heart icons on the days that have journal entries
    renderDayCell = (info) => {
        let dateStr = info.date.toISOString().split("T")[0];
        // checks to see if a specific day on the monthly calendar appears in iconDates object
        // if it does, it creates an element that displays the heart icon for that day on the monthtly calendar
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
                {/* using Full Calendar library to incorporate monthly calendar on to home page */}
                <FullCalendar plugins={[ dayGridPlugin ]} initialView="dayGridMonth" dayCellDidMount={this.renderDayCell} eventBorderColor="black"/>
            </div>
        );
    }
}

export default Calendar;