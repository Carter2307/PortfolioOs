import {AppT} from "../../core/App.ts";
import React from "react";
import Observable, {ObservableData} from "../../core/observable.ts";
import {useDrag} from "../../hooks/useGesture.ts";
import "./window.css";

interface WindowProps {
  app: AppT
}

type WindowState = "opened" | "closed" | "minimized"

export function Root() {
  const [windows, setWindow] = React.useState<AppT[]>([]);

  //Add new window to window stack
  React.useEffect(() => {
    Observable.subscribe((observableData: ObservableData) => {
      if (observableData.event == "window:create") {
        if (windows[observableData.data.id]) return;
        const w = [...windows, observableData.data];
        setWindow(w);
      }
    })
  }, [Observable, windows]);

  //When window is close
  React.useEffect(() => {
    Observable.subscribe((observableData: ObservableData) => {
      if (observableData.event == "window:close") {
        const w = windows.filter((window) => window.id !== observableData.data.id);
        setWindow(w);
      }
    })
  }, [Observable, windows]);

  //When window is minimize
  React.useEffect(() => {
    Observable.subscribe((observableData: ObservableData) => {
      if (observableData.event == "window:minimize") {
        if (windows[observableData.data.id]) {
          console.log(windows[observableData.data.id])
        }

      }
    })
  }, [Observable, windows]);

  return <div className={"__windows-container"}>
    {windows.map((app: AppT) => {
      return <Layout key={app.id} app={app}/>
    })}
  </div>
}

export function Layout(props: WindowProps) {
  const {app, ...rest} = props;
  const windowRef = React.useRef<HTMLDivElement>(null);
  const windowHeaderRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState<{ x: number, y: number }>({})
  const ondrag = useDrag((x, y) => {
    setPosition({x, y})
  });

  const style = {
    left: `${position.x}px`,
    top: `${position.y}px`,
  }


  function closeHandler() {
    Observable.notify({data: {id: app.id}, event: "window:close"})
  }

  function minimizeHandler() {
    if (windowRef.current) {
      Observable.notify({data: {id: app.id}, event: "window:minimize"})
    }
  }

  /**
   * TODO
   * On focus on window : Make current focus window on top of other
   * The minimize handler : Allow window to be minimized
   * By default opent window in center of the screen
   * Prevent window to offset menu bar
   */

  return <div className={"__window"}
              data-window-state={`${app.state === "running" ? "opened" : "closed"}`}
              data-app-id={app.id} ref={windowRef}
              style={style}
              {...rest}>

    <div className={"__window-header"} ref={windowHeaderRef}  {...ondrag()}>
      <div className={"__window-header-actions"}>
        <button onClick={closeHandler}></button>
        <button onClick={minimizeHandler}></button>
      </div>
      <p className={"__window-header-title"}>{app.name}</p>
    </div>

    <div className={"__window-body"}>
      {app.component}
    </div>
  </div>
}

export function open(component: AppT) {
  Observable.notify({data: component, event: "window:create"});
}
