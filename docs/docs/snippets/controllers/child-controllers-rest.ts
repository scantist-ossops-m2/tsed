import {Controller} from "@tsed/di";
import {CalendarCtrl} from "./CalendarCtrl.js";
import {EventCtrl} from "./EventCtrl.js";

@Controller({
  path: "/rest",
  children: [CalendarCtrl, EventCtrl]
})
export class RestCtrl {}
