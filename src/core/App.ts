import {JSX, ReactNode} from "react";
import {processManager} from "./processManager.ts";
import * as Window from "../components/Window/window.tsx";
import Observable, {ObservableData} from "./observable.ts";

export interface AppT {
  id?: string
  name: string
  icon: string
  component: ReactNode | JSX.Element
  state: "starting" | "running" | "stopped" | "standby"
}

class App {
  id?: string
  name: string
  icon: string
  component: React.ReactNode | React.JSX.Element | string = "Your app here"
  state:  "starting" | "running" | "stopped" | "standbyed"

  constructor(app: AppT) {
    this.name = app.name;
    this.icon = app.icon;
    this.component = app.component;
    this.state= "starting";
    Observable.subscribe(this.stop);
    this.run = this.run.bind(this)
  }

  run() {
    const found = processManager.apps.find((app) => app.id === this.id);
    if (found) {
      this.state = "running"
      Window.open(this as AppT);
    } else {
      processManager.add(this as AppT);
      this.state = "starting"
      this.render();
    }
  }

  stop = (observableData: ObservableData) => {
    if(observableData.event === "window:close") {
      this.state = "stopped";
    }
  }

  render() {
    this.state= "running";
    Window.open(this as AppT);
  }
}

export {App as Application}