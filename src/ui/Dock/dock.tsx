import "./dock.css";
import * as React from "react";
import {useRef, useState} from "react";

const clamp = (min: number, value: number, max: number) => {
  return Math.min(Math.max(value, min), max)
}


export const DockArea = ({magnification}: { magnification: number }) => {
  return <section className={"dock-area"}>
    <Dock magnification={magnification}/>
  </section>
}

const Dock = ({magnification}: { magnification: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);


  return <div className={"dock"} ref={dockRef}>
    <div className={"dock-container"} ref={containerRef}>
      {[1, 2,3,4,5].map((item) => {
        return <DockApp key={item} magnification={magnification} dockRef={dockRef} containerRef={containerRef}/>
      })}
    </div>
  </div>
}

const DockApp = ({magnification, dockRef, containerRef}: {
  magnification: number,
  dockRef: React.RefObject<HTMLDivElement>,
  containerRef: React.RefObject<HTMLDivElement>
}) => {

  let currentSize = 0;
  let scaledSize = 64 * magnification;
  let initialSize = 38;
  const elementRef = React.useRef<HTMLDivElement>(null);
  const duration = 600;


  React.useEffect(() => {
    if (!containerRef || !dockRef) return;
    const container = containerRef.current;
    const dock = dockRef.current;
    if (!container || !dock) return;
    const element = elementRef.current;

    if (!element) return;

    function getSize(e: PointerEvent, element: HTMLElement) {
      const {x, y} = getElementProperties(element)
      const distance = Math.sqrt(Math.pow((e.x - x), 2) + Math.pow(e.y - y, 2));

      return {
        size: clamp(initialSize, scaledSize - (distance / 4), scaledSize),
        distance
      }

    }

    function getElementProperties(element: HTMLElement) {
      const width = element.getBoundingClientRect().width
      return {
        x: element.getBoundingClientRect().x + (width / 2),
        y: element.getBoundingClientRect().y + (width / 2)
      }
    }

    function onmouseenter(e: PointerEvent) {
      if (!element) return;
      const {size} = getSize(e, element);
      if (size == initialSize) return;

      animateNumber(initialSize, size, 600, (value: number) => {
        console.log(value);
        element.style.width = value + 'px';
        element.style.height = value + 'px';
        currentSize = value;
      });
    }

    function onmousemove(e: PointerEvent) {
      e.preventDefault();
      if (!element) return;
      const {size} = getSize(e, element);

        element.style.width = size + 'px';
        element.style.height = size + 'px';

    }

    function onmouseleave(e: PointerEvent) {
      if (!element) return;
      currentSize = initialSize;
      const {size} = getSize(e, element);

      animateNumber(size, initialSize, duration, (value: number) => {
        element.style.width = value + 'px';
        element.style.height = value + 'px';
      })

    }

    dock.addEventListener("pointerenter", onmouseenter);
    dock.addEventListener("pointermove", onmousemove);
    dock.addEventListener("pointerleave", onmouseleave);

    return () => {
      dock.removeEventListener("pointermove", onmousemove);
      dock.removeEventListener("pointerleave", onmouseleave);
      dock.removeEventListener("pointerenter", onmouseenter);
    }

  }, []);
  return <div className={"dock-app"} ref={elementRef}></div>
}


function animateNumber(from, to, duration, onUpdate, onComplete) {
  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;

    const progress = timestamp - start;

    const percentage = Math.min(progress / duration, 1);

    const easedProgress = easeOutQuad(percentage);

    const value = from + (to - from) * easedProgress;

    onUpdate(value);

    if (progress < duration) {
      requestAnimationFrame(step);
    } else {
      if (onComplete) onComplete();
    }
  }

  requestAnimationFrame(step);
}

// Easing function - Quadratic ease-out
function easeOutQuad(t) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutExpo(x) {
  return x === 0
    ? 0
    : x === 1
      ? 1
      : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
        : (2 - Math.pow(2, -20 * x + 10)) / 2;
}


function easeOutBack(x: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;

  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}
