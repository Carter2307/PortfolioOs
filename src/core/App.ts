import {JSX, ReactNode} from "react";
import {processManager} from "./processManager.ts";
import * as Window from "../components/Window/window.tsx";
import Observable, {ObservableData} from "./observable.ts";

export interface AppT {
  id?: string
  name: string
  icon: string
  component: ReactNode | JSX.Element
}

class App {
  id?: string
  name: string
  icon: string
  component: React.ReactNode | React.JSX.Element | string = "Your app here"
  isOpen: boolean

  constructor(app: AppT) {
    this.name = app.name;
    this.icon = app.icon;
    this.component = app.component;
    this.isOpen= false;
    Observable.subscribe(this.stop);
    this.run = this.run.bind(this)
  }

  run() {
    const found = processManager.apps.find((app) => app.id === this.id);
    if (found) {
      throw "This process already start";
    } else {
      processManager.add(this as AppT);
      this.render();
    }
  }

  stop = (observableData: ObservableData) => {
    if(observableData.event === "window:close") {
      this.isOpen = false;
    }
  }

  render() {
    Window.open(this as AppT);
    this.isOpen= true;
  }
}

export {App as Application}