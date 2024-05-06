import {AppT} from "../../core/App.ts";
import React from "react";
import Observable, {ObservableData} from "../../core/observable.ts";
import "./window.css"
import {UseMousePosition} from "../../hooks/useMousePosition.ts";

interface WindowProps {
  app: AppT
}

export function Root() {
  const [windows, setWindow] = React.useState<AppT[]>([]);

  //Add new window to window stack
  React.useEffect(() => {
    Observable.subscribe((observableData: ObservableData) => {
      if (observableData.event == "window:create") {
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

  return <div className={"__windows-container"}>
    {windows.map((app: AppT) => {
      return <Layout key={app.id} app={app}/>
    })}
  </div>
}

export function Layout(props: WindowProps) {
  const {app, ...rest} = props;
  const windowHeaderRef = React.useRef<HTMLDivElement>(null);
  let [currentWindowPosition, setCurrentWindowPosition] = React.useState({x: 0, y: 0})
  let [currentMousePosition, setCurrentMousePosition] = React.useState({x: 0, y: 0})
  let [distance, setDistance] = React.useState({x: 0, y: 0});
  let oldDist= {x: 0, y: 0};
  const mouse = UseMousePosition();

  const [isMouseDown, setIsMouseDown] = React.useState(false);

  function onclose() {
    Observable.notify({data: {id: app.id}, event: "window:close"})
  }


  function onmousedown(e: MouseEvent) {
    e.preventDefault();
    setCurrentMousePosition({x: e.x, y: e.y});
    setIsMouseDown(true)
    window.addEventListener('mouseup', onmouseup)

  }

  function onmouseup(e: MouseEvent) {
    e.preventDefault()
    setIsMouseDown(false);
    setCurrentMousePosition(distance);
    window.removeEventListener("mouseup", onmouseup)
  }

  React.useEffect(() => {
    if (!windowHeaderRef.current) return
    const element = windowHeaderRef.current;

    element.addEventListener('mousedown', onmousedown)

    return () => {
      window.removeEventListener("mousedown", onmousedown);
    }
  }, [])


  React.useEffect(() => {
    if (!windowHeaderRef.current) return;
    if (isMouseDown && mouse) {
      const {x, y} = mouse; // target position

      const diff = {
        x: x - currentMousePosition.x,
        y: y - currentMousePosition.y,
      }

      console.log(diff)
      setDistance(diff)
    }

  }, [isMouseDown, mouse, currentMousePosition])

  React.useEffect(() => {
    if (!windowHeaderRef.current || !mouse) return;
    const element = windowHeaderRef.current;
    element.style.transform = `translate3d(${oldDist.x - distance.x * -1}px, ${oldDist.y - distance.y * -1}px, 0)`;
  }, [distance,mouse])

  return <div className={"__window"} ref={windowHeaderRef} {...rest}>

    <div className={"__window-header"}>
      <div className={"__window-header-actions"}>
        <button onClick={onclose}></button>
        <button onClick={onclose}></button>
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
