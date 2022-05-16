<script lang="ts">
  import { onMount } from "svelte";
  import Calendar, { ISchedule } from "tui-calendar";
  import "tui-calendar/dist/tui-calendar.css";

  import dayjs from "dayjs";
  import { editSchedule, events, tuiApi } from "../store";
  import ModalControl from "./ModalControl";
  import EditSchedule from "./EditSchedule.svelte";
  import Weekday from "dayjs/plugin/weekday";

  dayjs.extend(Weekday);
  let scheduleNumber = 1;
  let workweek = true;
  let calendarEl;
  onMount(async () => {
    initCalendar();
    /* return () => {
             calendar && calendar.destroy();
         };*/
    registerEventListeners();
  });

  function initCalendar() {
    tuiApi.set(
      new Calendar(document.getElementById("calendar"), {
        defaultView: "week",
        taskView: false,
        scheduleView: ["time"],
        usageStatistics: false,
      })
    );

    // change start day of week(from monday)
    $tuiApi.setOptions(
      { week: { startDayOfWeek: 1, workweek: workweek } },
      true
    );
    $tuiApi.changeView($tuiApi.getViewName(), true);
  }

  function registerEventListeners() {
    $tuiApi.on("clickSchedule", function (event) {
      console.log(event.schedule);
      editSchedule.set(event.schedule);
      ModalControl.open("Edit", "")
        .setCustomBody(EditSchedule)
        .setCustomButtonBar("");
    });

    $tuiApi.on("beforeUpdateSchedule", function (event) {
      let schedule = event.schedule;
      let changes = event.changes;
      $tuiApi.updateSchedule(schedule.id, schedule.calendarId, changes);
      $events.set(Number(schedule.id), schedule);
      $events = $events;
      $tuiApi = $tuiApi;
    });

    $tuiApi.on("beforeCreateSchedule", function (event) {
      let startTime = event.start;
      let endTime = event.end;
      let triggerEventName = event.triggerEventName;
      let schedule;

      if (triggerEventName === "mouseup") {
        schedule = {
          calendarId: 1,
          title: "",
          category: "time",
          start: startTime,
          end: endTime,
          id: scheduleNumber,
        };
      }
      $events.set(scheduleNumber++, schedule);
      $tuiApi.createSchedules([schedule]);
      $events = $events;
      $tuiApi = $tuiApi;
    });
  }

  $: {
    // Update calender schedules if $events changes
    //@ts-ignore
    $events.forEach((e) => $tuiApi.updateSchedule(e.id, e.calendarId, e.title));
    // calendar?.render(true);
  }

  function toToday() {
    $tuiApi.setDate(dayjs().toDate());
    $tuiApi = $tuiApi;
  }

  function nextWeek() {
    $tuiApi.next();
    $tuiApi = $tuiApi;
  }

  function prevWeek() {
    $tuiApi.prev();
    $tuiApi = $tuiApi;
  }

  function toggleWeekends() {
    workweek = !workweek;
    $tuiApi.setOptions(
      { week: { startDayOfWeek: 1, workweek: workweek } },
      true
    );
    $tuiApi.changeView($tuiApi.getViewName(), true);
    $tuiApi = $tuiApi;
  }
</script>

<div class="my-4 ml-4 grid grid-cols-3 gap-4">
  <span class="text-left">
    <button
      on:click={() => toToday()}
      type="button"
      class="inline-flex items-center dark:bg-gray-800 bg-gray-100 border-0 py-1 px-3 focus:outline-none dark:hover:bg-gray-700 hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
      data-action="move-today">Today</button
    >
    <button
      on:click={() => prevWeek()}
      type="button"
      class="inline-flex my-auto items-center dark:bg-gray-800 bg-gray-100 border-0 py-1 px-3 focus:outline-none dark:hover:bg-gray-700 hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
      data-action="move-prev"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class=""
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
        />
      </svg>
    </button>
    <button
      on:click={() => nextWeek()}
      type="button"
      class="inline-flex items-center dark:bg-gray-800 bg-gray-100 border-0 py-1 px-3 focus:outline-none dark:hover:bg-gray-700 hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
      data-action="move-next"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class=""
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </button>
  </span>
  <span
    >{dayjs($tuiApi?.getDate().toDate()).weekday(1).format("D.M.YYYY") +
      " - " +
      dayjs($tuiApi?.getDate().toDate()).weekday(7).format("D.M.YYYY")}</span
  >
  <div class="ml-auto">
    <button
      type="button"
      on:click={() => toggleWeekends()}
      class="dark:bg-gray-800 bg-gray-100 border-0 py-1 px-3 focus:outline-none dark:hover:bg-gray-700 hover:bg-gray-200 rounded mt-4 md:mt-0"
      >{workweek ? "Display weekend" : "Hide weekend"}</button
    >
  </div>
</div>
<div id="calendar" bind:this={calendarEl} />
