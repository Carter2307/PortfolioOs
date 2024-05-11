import {JSX, ReactNode} from "react";
import {processManager} from "./processManager.ts";
import * as Window from "../ui/Window/window.tsx";
import Observable, {ObservableData} from "./observable.ts";

export interface AppT {
  id?: number
  name: string
  icon: string
  component: ReactNode | JSX.Element
  state?: "starting" | "running" | "stopped" | "standby"
}

class App {
  id?: number
  name: string
  icon: string
  component: React.ReactNode | React.JSX.Element | string = "Your app here"
  state: "initialized" | "starting" | "running" | "stopped" | "standby"

  constructor(app: AppT) {
    this.name = app.name;
    this.icon = app.icon;
    this.component = app.component;
    this.state = "initialized";
    Observable.subscribe(this.stop);
    this.run = this.run.bind(this)
  }

  run() {
    this.state = "running";
    Window.open(this as AppT);
  }

  stop = (observableData: ObservableData) => {
    if (observableData.event === "window:close" && observableData.data.id === this.id) {
      console.log(this)
      this.state = "stopped";
    }
  }

}

export {App as Application}