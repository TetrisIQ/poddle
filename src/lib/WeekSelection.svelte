<script lang="ts">

    import {onMount} from 'svelte';
    import Calendar, {ISchedule} from "tui-calendar";
    import "tui-calendar/dist/tui-calendar.css";

    // If you use the default popups, use this.
    import 'tui-date-picker/dist/tui-date-picker.css';
    import 'tui-time-picker/dist/tui-time-picker.css';
    import dayjs from "dayjs";
    import {writable} from "svelte/store";
    import {events} from "../store";

    let scheduleNumber = 1;
    export function getAPI() {
        return calendar;
    }

    let calendarEl;
    let calendar: Calendar;
    onMount(async () => {
        initCalendar();
        /* return () => {
             calendar && calendar.destroy();
         };*/
        registerEventListeners();
    });

    function initCalendar() {
        calendar = new Calendar(document.getElementById('calendar'), {
            defaultView: 'week',
            taskView: false,
            scheduleView: ['time'],
            usageStatistics: false,
        });

        // change start day of week(from monday)
        calendar.setOptions({week: {startDayOfWeek: 1}}, true);
        calendar.changeView(calendar.getViewName(), true);

       /* calendar.createSchedules([
            {
                id: '1',
                calendarId: '1',
                title: 'my schedule',
                category: 'time',
                dueDateClass: '',
                start: dayjs().toISOString(),
                end: dayjs().toISOString()
            },
            {
                id: '2',
                calendarId: '1',
                title: 'second schedule',
                category: 'time',
                dueDateClass: '',
                start: dayjs().toISOString(),
                end: dayjs().add(1, "hour").toISOString()
            }
        ]);*/

    }

    function registerEventListeners() {
        calendar.on("beforeUpdateSchedule", function (event) {
            let schedule = event.schedule;
            let changes = event.changes;
            calendar.updateSchedule(schedule.id, schedule.calendarId, changes);
            $events.set(Number(schedule.id), schedule);
        });

        calendar.on('beforeCreateSchedule', function(event) {
            let startTime = event.start;
            let endTime = event.end;
            let triggerEventName = event.triggerEventName;
            let schedule;

            if (triggerEventName === 'mouseup') {
                schedule = {
                    calendarId: scheduleNumber,
                    title: "Option " + scheduleNumber,
                    category: 'time',
                    start: startTime,
                    end: endTime
                }
            }
            $events.set(scheduleNumber++, schedule);
            calendar.createSchedules([schedule]);
        });



    }

    export function getAllEvents() {
        console.log(calendar)
    }


</script>

<div id="calendar" bind:this={calendarEl}></div>
