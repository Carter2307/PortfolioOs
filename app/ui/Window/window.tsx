'use client';

import { Application, AppT } from '@/app/core/App';
import React from 'react';
import Observable, { ObservableData } from '@/app/core/observable';
import { useDrag } from '@/app/hooks/useGesture';
import './window.css';
import { processManager } from '@/app/core/processManager';

interface WindowProps {
  app: AppT;
}

type WindowState = 'opened' | 'closed' | 'minimized';

export function Root() {
  const [windows, setWindows] = React.useState<Application[]>(
    processManager.apps,
  );

  const updateWindows = (observableData: ObservableData) => {
    setWindows(processManager.apps);
  };

  console.log(windows);

  const createHandler = (observableData: ObservableData) => {
    if (observableData.event == 'window:create') {
      if (windows[observableData.data.id]) return;
      const w = [...windows, observableData.data];
      setWindows(w);
    }
  };

  const closeHandler = (observableData: ObservableData) => {
    if (observableData.event == 'window:close') {
      const w = windows.filter(
        (window) => window.id !== observableData.data.id,
      );
      setWindows(w);
    }
  };

  const minimizeHandler = (observableData: ObservableData) => {
    if (observableData.event == 'window:minimize') {
      if (windows[observableData.data.id]) {
        console.log(windows[observableData.data.id]);
      }
    }
  };

  React.useEffect(() => {
    Observable.subscribe(updateWindows);
    return () => Observable.unsubscribe(updateWindows);
  }, [Observable, windows]);

  /* //Add new window to window stack
   React.useEffect(() => {
     Observable.subscribe(createHandler)
     Observable.subscribe(closeHandler)
     Observable.subscribe(minimizeHandler)

     return () => {
       Observable.unsubscribe(createHandler);
       Observable.unsubscribe(closeHandler);
       Observable.unsubscribe(minimizeHandler);
     }
   }, [Observable, windows]);*/

  return (
    <div className={'__windows-container'}>
      {windows.map((app: AppT) => {
        return <Layout key={app.id} app={app} />;
      })}
    </div>
  );
}

export function Layout(props: WindowProps) {
  const { app, ...rest } = props;
  const windowRef = React.useRef<HTMLDivElement>(null);
  const windowHeaderRef = React.useRef<HTMLDivElement>(null);
  const ondrag = useDrag((x, y) => {
    if (!windowRef || !windowRef.current) return;
    windowRef.current.style.left = `${x}px`;
    windowRef.current.style.top = `${y}px`;
  });

  function closeHandler() {
    Observable.notify({ data: { id: app.id }, event: 'window:close' });
  }

  function minimizeHandler() {
    if (windowRef.current) {
      Observable.notify({ data: { id: app.id }, event: 'window:minimize' });
    }
  }

  /**
   * TODO
   * On focus on window : Make current focus window on top of other
   * The minimize handler : Allow window to be minimized
   * By default opent window in center of the screen
   * Prevent window to offset menu bar
   */

  return (
    <div
      className={'__window'}
      data-window-state={`${app.state === 'running' ? 'opened' : 'closed'}`}
      data-app-id={app.id}
      ref={windowRef}
      {...rest}
    >
      <div className={'__window-header'} ref={windowHeaderRef} {...ondrag()}>
        <div className={'__window-header-actions'}>
          <button onClick={closeHandler}></button>
          <button onClick={minimizeHandler}></button>
        </div>
        <p className={'__window-header-title'}>{app.name}</p>
      </div>

      <div className={'__window-body'}>{app.component}</div>
    </div>
  );
}

export function open(component: AppT) {
  Observable.notify({ data: component, event: 'window:create' });
}
