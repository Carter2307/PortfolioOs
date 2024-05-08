import React, {HTMLProps, ReactElement, ReactNode, useRef} from "react";
import './style.css'
import {useDock} from "../dock.tsx";
import {useMousePosition} from "../hooks/useMousePosition.ts";
import {animated, useSpringValue} from '@react-spring/web'


const INITIAL_WIDTH = 48;

export const DockApp = (props) => {
  const {children, app,  ...rest} = props
  const dock = useDock();
  const cardRef = useRef<HTMLButtonElement>(null);
  const [elementCenterX, setElementCenterX] = React.useState(0);
  const {x} = useMousePosition();

  const size = useSpringValue(INITIAL_WIDTH, {
    config: {
      mass: 0.1,
      tension: 320,
    },
  })

  function computeElementCenter() {
    if (cardRef.current) {
      const {x} = cardRef.current.getBoundingClientRect()
      setElementCenterX(x + (INITIAL_WIDTH / 2));
    }
  }

  React.useEffect(() => {
    computeElementCenter();
  }, [])

  React.useEffect(() => {
    const transformedValue = INITIAL_WIDTH + 36 * Math.cos((((x - elementCenterX) / dock.width) * Math.PI) / 2) ** 12;
    if (dock.hovered) {
      size.start(transformedValue);
    }

  }, [x, dock])

  React.useEffect(() => {
    if (dock.hovered) return;
    size.start(INITIAL_WIDTH)

  }, [dock.hovered])


  return <div className={"dock-card-container"}>
    <animated.button
      className={"dock-card"}
      ref={cardRef}
      style={{
        width: size,
        height: size
      }}

      {...rest}
    >
      {children}
    </animated.button>
    <span className={`dock-dot ${app.state === "running" ? "dock-dot-active": ""}`}></span>
  </div>
}


