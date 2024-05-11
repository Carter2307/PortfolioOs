import {Application} from "@/app/core/App";
import {TerminalApp} from "@/app/ui/Terminal/terminal";

const iconDirectory = "/app-icons"


export default [
  {
    name: "Terminal",
    icon: `${iconDirectory}/terminal.png`,
    component: <TerminalApp/>
  },
  {
    name: "Calculator",
    icon: `${iconDirectory}/calculator.png`,
    component: <h1>Calculator app</h1>
  },
  {
    name: "Music",
    icon: `${iconDirectory}/ipod.png`,
    component: <h1>Calculator app</h1>
  }
]

