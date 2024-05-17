import {Get} from "@tsed/schema";
import {Controller} from "@tsed/di";
import {EventCtrl} from "./EventCtrl.js";

@Controller({
  path: "/calendars",
  children: [EventCtrl]
})
export class CalendarCtrl {
  @Get()
  get() {}
}
