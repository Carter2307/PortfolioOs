import {AppT} from "./App.ts";
import Observable, {ObservableData} from "./observable.ts";

class AppProcessManager {
  apps: AppT[] | [];

  constructor() {
    this.apps  = [];
  }

  remove = (observableData: ObservableData) => {
    if(observableData.event == "window:close") {
      console.log("remove app with id: ", observableData.data.id)
      this.apps = this.apps.filter((app) => app.id !== observableData.data.id ) as [AppT] ;
    }
  }

  add = (app: AppT) => {
    console.log(app)
    if(app.id) return;
    app.id = this.apps.length.toString()
    this.apps = [...this.apps, app];
  }
}

const processManager = new AppProcessManager();
Observable.subscribe(processManager.remove);

export {processManager}