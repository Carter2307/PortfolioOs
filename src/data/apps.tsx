import {Application} from "../core/App.ts";
import {TerminalApp} from "../components/Terminal/terminal.tsx";

const iconDirectory = "/app-icons"

export default [
  new Application({
    name: "Terminal",
    icon: `${iconDirectory}/terminal.png`,
    component: <TerminalApp/>
  }),
  new Application({
    name: "Calculator",
    icon: `${iconDirectory}/calculator.png`,
    component: <h1>Calculator app</h1>
  }),
  new Application({
    name: "Music",
    icon: `${iconDirectory}/ipod.png`,
    component: <h1>Calculator app</h1>
  })
]

