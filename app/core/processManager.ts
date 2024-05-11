import {Application, AppT} from "./App";
import Observable, {ObservableData} from "./observable";

class AppProcessManager {
  apps: Application[] | [];

  constructor() {
    this.apps = [];
  }

  remove = (observableData: ObservableData) => {
    if (observableData.event == "window:close") {
      console.log("remove app with id: ", observableData.data.id)
      this.apps = this.apps.filter((app) => app.id !== observableData.data.id) as Application[];
    }
  }

  add = (app: AppT) => {
    const found = this.apps.find((a) => a.id === app.id || a.name === app.name );
    if (found) return;
    if (app.state === "running") return;
    const a = new Application(app)
    a.id = this.generateId(app)
    this.apps = [...this.apps, a];
    a.run();
  }

  generateId = (app: AppT): number => {
    const id = Math.round(Math.random() * 256) + app.name.length - 1;
    if (this.apps.find((a) => a.id === app.id)) {
      return this.generateId(app)
    }

    return id
  }
}

const processManager = new AppProcessManager();
Observable.subscribe(processManager.remove);

export {processManager}