import React, { HTMLProps, ReactElement, ReactNode, useRef } from 'react';
import './style.css';
import { useDock } from '../dock';
import { animated, useSpringValue } from '@react-spring/web';
import Observable, { ObservableData } from '@/app/core/observable';

const INITIAL_WIDTH = 48;

export const DockApp = (props) => {
  const { children, app, ...rest } = props;
  const dock = useDock();
  const cardRef = useRef<HTMLButtonElement>(null);
  const [elementCenterX, setElementCenterX] = React.useState(0);
  const [application, setApplication] = React.useState(app);

  const onAppCreate = (observabledata: ObservableData) => {
    if (observabledata.event === 'window:create') {
      if (observabledata.data.name === app.name) {
        setApplication(observabledata.data);
      }
    }
  };

  const onAppClose = (observabledata: ObservableData) => {
    if (observabledata.event === 'window:close') {
      if (observabledata.data.name === app.name) {
        setApplication(observabledata.data);
      }
    }
  };

  React.useEffect(() => {
    Observable.subscribe((observabledata: ObservableData) => {
      if (observabledata.event === 'window:create') {
        if (observabledata.data.name === app.name) {
          setApplication(observabledata.data);
        }
      }
    });

    Observable.subscribe((observabledata: ObservableData) => {
      if (observabledata.event === 'window:close') {
        if (observabledata.data.name === app.name) {
          setApplication(observabledata.data);
        }
      }
    });
  }, [Observable, app]);

  const size = useSpringValue(INITIAL_WIDTH, {
    config: {
      mass: 0.1,
      tension: 320,
    },
  });

  function computeElementCenter() {
    if (cardRef.current) {
      const { x } = cardRef.current.getBoundingClientRect();
      setElementCenterX(x + INITIAL_WIDTH / 2);
    }
  }

  React.useEffect(() => {
    computeElementCenter();
  }, []);

  function onMouseMove(e: MouseEvent) {
    e.preventDefault();
    const transformedValue =
      INITIAL_WIDTH +
      36 *
        Math.cos((((e.x - elementCenterX) / dock.width) * Math.PI) / 2) ** 12;
    if (dock.hovered) {
      size.start(transformedValue);
    } else {
      size.start(INITIAL_WIDTH);
    }
  }

  React.useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, [dock]);

  return (
    <div className={'dock-card-container'}>
      <animated.button
        className={'dock-card'}
        ref={cardRef}
        style={{
          width: size,
          height: size,
        }}
        {...rest}
      >
        {children}
      </animated.button>
      <span
        className={`dock-dot ${application.state === 'running' ? 'dock-dot-active' : ''}`}
      ></span>
    </div>
  );
};
