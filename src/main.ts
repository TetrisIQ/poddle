import "./app.css";
import App from "./App.svelte";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(RelativeTime)

const app = new App({
  target: document.getElementById("app"),
});

export default app;
